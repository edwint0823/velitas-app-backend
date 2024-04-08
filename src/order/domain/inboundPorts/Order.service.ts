import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { Between, In, Like, MoreThanOrEqual } from 'typeorm';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { IOrderService } from './IOrderService';
import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { FiltersDto } from '../../adapters/model/queryParamsListOrder.dto';
import { IBagInventoryNeed, ICreateOrderInfoDomain } from '../model/in/createOrderInfoDomain';
import { createOrderResponseDomain } from '../model/out/createOrderResponseDomain';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';
import { IOrderRepository } from '../outboundPorts/IOrderRepository';
import { ICustomerRepository } from '../../../customer/domain/outboundPorts/ICustomerRepository';
import { IStatusRepository } from '../../../status/domain/outboundPorts/IStatusRepository';
import { IBagRepository } from '../../../bag/domain/outboundPorts/IBagRepository';
import { IConfigurationService } from '../../../configuration/domain/inboundPorts/IConfigurationService';
import { OrderMapper } from '../mappers/Order.mapper';
import {
  dayMaxDelivery,
  IAuthUser,
  maxStatusToCancel,
  minimumDaysToDoOrder,
  minutesOfHour,
  monthMaxDelivery,
  orderCreateNameStatus,
  timeToDoOneCandleNameParam,
  timeZoneDayjs,
  workingHours,
} from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IConfigurationService)
    private readonly configurationService: IConfigurationService,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IStatusRepository)
    private readonly statusRepository: IStatusRepository,
    @Inject(IBagRepository)
    private readonly bagRepository: IBagRepository,
  ) {}

  async create(orderInfo: createOrderDto): Promise<createOrderResponseDomain> {
    try {
      const orderCode = await this.orderRepository.getCodeOrder();
      const totalPrice = orderInfo.candles.reduce((acc, candle) => acc + candle.price, 0);
      const totalQuantity = orderInfo.candles.reduce((acc, candle) => acc + candle.quantity, 0);
      const { value: timeToDoOneCandle } = await this.configurationService.findParamByName(timeToDoOneCandleNameParam);
      const daysToDoCandles = Math.ceil(
        Math.ceil((totalQuantity * Number(timeToDoOneCandle)) / minutesOfHour) / workingHours,
      );

      const maxDayToDelivery = dayjs().set('month', monthMaxDelivery).set('date', dayMaxDelivery);
      let deliveryDate = dayjs().add(daysToDoCandles + minimumDaysToDoOrder, 'days');

      if (deliveryDate.isAfter(maxDayToDelivery)) {
        deliveryDate = maxDayToDelivery;
      }

      let customer = await this.customerRepository.findByEmail(orderInfo.customer.email);
      if (customer === null) {
        customer = await this.customerRepository.createCustomer(orderInfo.customer);
      }

      const statusInfo = await this.statusRepository.findStatusIdByName(orderCreateNameStatus);
      if (statusInfo === null) {
        new Error('Ha ocurrido un error al crear la orden');
      }

      const bagsInDb = await this.bagRepository.listAllBagsAvailable();
      const maxCapacityBag = bagsInDb.shift();
      const individualBag = bagsInDb.pop();

      const createOrderInfo: ICreateOrderInfoDomain = {
        order: {
          code: orderCode,
          total_price: totalPrice,
          total_quantity: totalQuantity,
          delivery_date: deliveryDate.toDate(),
          customer_id: customer.id,
          status_id: statusInfo.id,
        },
        bagInventoryNeed: [
          {
            bag_id: maxCapacityBag.id,
            order_id: undefined,
            quantity: Math.round(totalQuantity / maxCapacityBag.capacity),
          },
        ],
        orderDetails: [],
      };

      const temporaryBagsNeed: IBagInventoryNeed[] = [];

      for (const detail of orderInfo.candles) {
        let candleToPackAlone = detail.name_list.filter((name) => name.packAlone).length;
        let RemindCandles = detail.quantity - candleToPackAlone;

        for (const bagDb of bagsInDb) {
          if (RemindCandles === 0) break;

          const bagQuantity = RemindCandles / bagDb.capacity;
          if (bagQuantity >= 1) {
            temporaryBagsNeed.push({
              bag_id: bagDb.id,
              quantity: Math.floor(bagQuantity),
            });
            RemindCandles -= Math.floor(bagQuantity) * bagDb.capacity;
          }
        }

        if (RemindCandles > 0) candleToPackAlone += RemindCandles;

        if (candleToPackAlone > 0) {
          temporaryBagsNeed.push({
            bag_id: individualBag.id,
            quantity: candleToPackAlone,
            order_id: undefined,
          });
        }

        for (const bag of temporaryBagsNeed) {
          const indexBagsInventoryNeed = createOrderInfo.bagInventoryNeed.findIndex((x) => x.bag_id === bag.bag_id);

          if (indexBagsInventoryNeed !== -1) {
            createOrderInfo.bagInventoryNeed[indexBagsInventoryNeed].quantity += bag.quantity;
          } else {
            createOrderInfo.bagInventoryNeed.push(bag);
          }
        }
        createOrderInfo.orderDetails.push({
          name_list: JSON.stringify(detail.name_list),
          price: detail.price,
          quantity: detail.quantity,
          observation: detail.observation,
          candle_option_id: detail.candle_option_id,
          order_id: undefined,
        });
      }
      const orderCreated = await this.orderRepository.createOrder(createOrderInfo);
      return {
        message: `Orden Nro ${orderCreated.code} creada exitosamente`,
        totalPrice: orderCreated.total_price,
        totalQuantity: orderCreated.total_quantity,
        estimatedDelivered: orderCreated.delivery_date,
        orderCode: orderCreated.code,
      };
    } catch (error) {
      const { message, status } = getErrorParams(error, 'Error al crear el pedido');
      throw new HttpException({ message }, status);
    }
  }

  async findByCode(code: string): Promise<FindOrderAndDetailsDomain> {
    const findOrder = await this.orderRepository.getOrderAndDetailsByCode(code);
    return OrderMapper.findOrderAndDetailsByCodeMapper(findOrder);
  }

  async getPaginateListOrders(pageSize: number, pageNumber: number, filters?: FiltersDto) {
    const whereOptions = {};
    if (filters) {
      if (filters.customer_name) {
        whereOptions['customer'] = {
          name: Like(`%${filters.customer_name.toUpperCase()}%`),
        };
      }
      if (filters.orders_code) {
        whereOptions['code'] = In(filters.orders_code);
      }

      if (filters.delivery_date_end) {
        whereOptions['delivery_date'] = Between(filters.delivery_date_begin, filters.delivery_date_end);
      } else if (filters.delivery_date_begin) {
        whereOptions['delivery_date'] = MoreThanOrEqual(filters.delivery_date_begin);
      }

      if (filters.created_at_end) {
        whereOptions['created_at'] = Between(filters.created_at_begin, filters.created_at_end);
      } else if (filters.created_at_begin) {
        whereOptions['created_at'] = MoreThanOrEqual(filters.created_at_begin);
      }
    }
    const skip = (pageNumber - 1) * pageSize;
    const paginatedData = await this.orderRepository.listOrdersPaginated(skip, pageSize, whereOptions);
    return OrderMapper.paginateOrder(paginatedData);
  }

  async updateOrderStatus(order_code: string, newStatusId: number, user: IAuthUser): Promise<{ message: string }> {
    if (!user.is_superuser) {
      throw new HttpException({ message: 'No tiene permisos para realizar esta acción' }, HttpStatus.UNAUTHORIZED);
    }
    try {
      const orderInfo = await this.orderRepository.getOrderByCode(order_code);
      const oldStatusInfo = orderInfo.status;
      const newStatusInfo = await this.statusRepository.findStatusById(newStatusId);

      if (oldStatusInfo.order === 0) {
        throw new HttpException(
          { message: 'No se puede actualizar el estado del pedido si ya ha sido cancelado' },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (newStatusInfo.order === 0 && oldStatusInfo.order >= maxStatusToCancel.order) {
        throw new HttpException(
          { message: 'El pedido no se puede cancelar ya que esta producción' },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (newStatusInfo.order !== 0 && oldStatusInfo.order > newStatusInfo.order) {
        throw new HttpException(
          { message: 'No se puede cambiar el estado del pedido a uno anterior ' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const statusLogPayload = {
        order_id: orderInfo.id,
        old_status_id: oldStatusInfo.id,
        new_status_id: newStatusId,
        created_by: user.id,
      };
      await this.orderRepository.updateStatusOrder(orderInfo.id, statusLogPayload);
      return { message: 'Pedido actualizado con éxito' };
    } catch (error) {
      const { message, status } = getErrorParams(error, 'Error al actualizar el estado del pedido');
      throw new HttpException({ message }, status);
    }
  }

  // PROCESO PARA AFECTAR EL INVENTRIO CUANDO SE CAMBIE A ESTADO DESEADO
  //    cuando se actualice un pedido debe realizar nuevamente el cálculo de cantidades de bolsas a necesitar y buscar los registros de bolsas necesitadas
  //    comparar cada tipo de bolsa si la cantidad es la misma, si no lo es debe tomar el ID del tipo de bolsa y la cantidad que uso (tabla de need) calcular la diferencian entre ambas
  //    y la diferencia debe sumarla o restarla inventario y después de actualizar el registro bolsas necesitadas con el nuevo cálculo
  //    verificar si esto es realmente necesario, ya que se podría dejar solo el inventario de bolsas a necesitar de manera informativa para cuando se cambie de estado a empaquetar hacer una salida
  //    con las bolsas que marca los registros del pedido al igual que para el inventario de velas
}
