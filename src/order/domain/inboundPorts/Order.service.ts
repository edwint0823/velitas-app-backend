import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { Between, In, Like, MoreThanOrEqual } from 'typeorm';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { IOrderService } from './IOrderService';
import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { QueryParamsListOrderDto } from '../../adapters/model/queryParamsListOrder.dto';
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
  orderErrorMessages,
  orderSuccessMessages,
  statusCanceled,
  statusForBagInventoryMovement,
  statusForCandleInventoryMovement,
  timeToDoOneCandleNameParam,
  timeZoneDayjs,
  workingHours,
} from '../../../../core/constants';
import { OrderUpdateDto } from '../../adapters/model/orderUpdate.dto';
import { OrderEntity } from '../../../../database/entities/Order.entity';
// eslint-disable-next-line max-len
import { ICandleInventoryMovementRepository } from '../../../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { IBagInventoryNeedRepository } from '../../../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../../../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
import { BagInventoryNeed, UpdateOrderAndDetailsDomain } from '../model/in/updateOrderAndDetailsDomain';
import { OrderDetailsAndBagsDomain } from '../model/out/orderDetailsAndBagsDomain';
import { OrderAndDetailsDomain } from '../model/out/editOrderAndDetailsDomain';
import { Workbook } from 'exceljs';
import { PaginateOrderDomain } from '../model/out/paginateOrderDomain';

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
    @Inject(ICandleInventoryMovementRepository)
    private readonly candleInventoryMovementRepository: ICandleInventoryMovementRepository,
    @Inject(IBagInventoryNeedRepository)
    private readonly bagInventoryNeedRepository: IBagInventoryNeedRepository,
    @Inject(IBagInventoryMovementRepository)
    private readonly bagInventoryMovementRepository: IBagInventoryMovementRepository,
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
        new Error(orderErrorMessages.service.create.default);
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
          delivery_address: orderInfo.delivery_address,
          additional_info: orderInfo.additional_info,
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

      console.log('detalle', createOrderInfo);
      console.log('bolsas', bagsInDb);
      for (const detail of orderInfo.candles) {
        const temporaryBagsNeed: IBagInventoryNeed[] = [];
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
        console.log('temporaly bags need ', temporaryBagsNeed);
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
        message: `Pedido Nro ${orderCreated.code} creado exitosamente`,
        totalPrice: orderCreated.total_price,
        totalQuantity: orderCreated.total_quantity,
        estimatedDelivered: orderCreated.delivery_date,
        orderCode: orderCreated.code,
      };
    } catch (error) {
      const { message, status } = getErrorParams(error, orderErrorMessages.service.create.default);
      throw new HttpException({ message }, status);
    }
  }

  async findByCode(code: string): Promise<FindOrderAndDetailsDomain> {
    const findOrder = await this.orderRepository.getOrderAndDetailsByCode(code);
    if (!findOrder) {
      throw new HttpException({ message: orderErrorMessages.service.findByCode.orderNotFound }, HttpStatus.BAD_REQUEST);
    }
    return OrderMapper.findOrderAndDetailsByCodeMapper(findOrder);
  }

  async getPaginateListOrders(
    pageSize: number,
    pageNumber: number,
    query?: QueryParamsListOrderDto,
  ): Promise<PaginateOrderDomain> {
    const whereOptions = {};
    if (query.customer_name) {
      whereOptions['customer'] = {
        name: Like(`%${query.customer_name.toUpperCase()}%`),
      };
    }
    if (query.orders_code) {
      whereOptions['code'] = In(query.orders_code);
    }

    if (query.delivery_date_end) {
      whereOptions['delivery_date'] = Between(query.delivery_date_begin, query.delivery_date_end);
    } else if (query.delivery_date_begin) {
      whereOptions['delivery_date'] = MoreThanOrEqual(query.delivery_date_begin);
    }

    if (query.created_at_end) {
      whereOptions['created_at'] = Between(query.created_at_begin, query.created_at_end);
    } else if (query.created_at_begin) {
      whereOptions['created_at'] = MoreThanOrEqual(query.created_at_begin);
    }

    const skip = (pageNumber - 1) * pageSize;
    const paginatedData = await this.orderRepository.listOrdersPaginated(skip, pageSize, whereOptions);
    return OrderMapper.paginateOrder(paginatedData);
  }

  async updateOrderStatus(order_code: string, newStatusId: number, user: IAuthUser): Promise<{ message: string }> {
    if (!user.is_superuser) {
      throw new HttpException(
        { message: orderErrorMessages.service.updateStatus.isNotSuperuser },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const newStatusInfo = await this.statusRepository.findStatusById(newStatusId);

      let orderInfo: OrderEntity;
      if (newStatusInfo.order >= statusForCandleInventoryMovement.order) {
        orderInfo = await this.orderRepository.getOrderAndDetailsByCode(order_code);
      } else {
        orderInfo = await this.orderRepository.getOrderAndStatusByCode(order_code);
      }

      if (!orderInfo) {
        throw new HttpException(orderErrorMessages.service.updateStatus.orderNotFound, HttpStatus.BAD_REQUEST);
      }

      const oldStatusInfo = orderInfo.status;

      if (oldStatusInfo.order === 0) {
        throw new HttpException(
          { message: orderErrorMessages.service.updateStatus.orderAlreadyCanceled },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (newStatusInfo.order === 0 && oldStatusInfo.order >= maxStatusToCancel.order) {
        throw new HttpException(
          { message: orderErrorMessages.service.updateStatus.orderAlreadyInProduction },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (newStatusInfo.order !== 0 && oldStatusInfo.order > newStatusInfo.order) {
        throw new HttpException(
          { message: orderErrorMessages.service.updateStatus.notAbleToUpdateUnderStatus },
          HttpStatus.BAD_REQUEST,
        );
      }

      const statusLogPayload = {
        order_id: orderInfo.id,
        old_status_id: oldStatusInfo.id,
        new_status_id: Number(newStatusId),
        created_by: JSON.stringify({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }),
      };
      await this.orderRepository.updateStatusOrder(orderInfo.id, statusLogPayload);

      if (
        oldStatusInfo.order < statusForCandleInventoryMovement.order &&
        newStatusInfo.order >= statusForCandleInventoryMovement.order
      ) {
        const candlesAndQuantityKeyValue: { [candleTypeId: number]: number } = {};

        for (const orderDetail of orderInfo.orders_details) {
          const candleTypeId: number = orderDetail.candle_option.candle_type_id;
          const quantity: number = Number(orderDetail.quantity);
          if (candlesAndQuantityKeyValue[candleTypeId]) {
            candlesAndQuantityKeyValue[candleTypeId] += quantity;
          } else {
            candlesAndQuantityKeyValue[candleTypeId] = quantity;
          }
        }
        const candlesAndQuantity = Object.entries(candlesAndQuantityKeyValue).map(([candleTypeId, quantity]) => ({
          candle_type_id: parseInt(candleTypeId),
          quantity: quantity,
          is_entry: false,
          is_out: true,
          // eslint-disable-next-line max-len
          observation: `Salida de inventario por modificación de estado a ${newStatusInfo.name} del pedido Nro ${orderInfo.code}`,
          created_by: JSON.stringify({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }),
        }));
        for (const candle of candlesAndQuantity) {
          await this.candleInventoryMovementRepository.createOutCandleInventoryMovement(candle);
        }
      }

      if (
        oldStatusInfo.order < statusForBagInventoryMovement.order &&
        newStatusInfo.order >= statusForBagInventoryMovement.order
      ) {
        const bagsNeed = await this.bagInventoryNeedRepository.getBagInventoryNeedForOrderByOrderCode(orderInfo.code);
        for (const bagNeed of bagsNeed) {
          const payload = {
            bag_id: bagNeed.bag_id,
            quantity: bagNeed.quantity,
            is_entry: false,
            is_out: true,
            // eslint-disable-next-line max-len
            observation: `Salida de inventario por modificación de estado a ${newStatusInfo.name} del pedido Nro ${orderInfo.code}`,
            created_by: JSON.stringify({
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }),
          };
          await this.bagInventoryMovementRepository.createOutInventoryMovement(payload);
        }
      }

      return { message: orderSuccessMessages.service.updateStatus.default };
    } catch (error) {
      const { message, status } = getErrorParams(error, orderErrorMessages.service.updateStatus.default);
      throw new HttpException({ message }, status);
    }
  }

  async updateOrderAndDetail(
    orderCode: string,
    orderData: OrderUpdateDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }> {
    if (!user.is_superuser) {
      throw new HttpException(
        { message: orderErrorMessages.service.updateOrderAndDetails.isNotSuperuser },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const order = await this.orderRepository.getOrderAndDetailsByCode(orderCode);
      if (!order) {
        throw new HttpException(
          { message: orderErrorMessages.service.updateOrderAndDetails.orderNotFound },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (order.status.order === statusCanceled.order) {
        throw new HttpException(
          { message: orderErrorMessages.service.updateOrderAndDetails.orderAlreadyCanceled },
          HttpStatus.BAD_REQUEST,
        );
      }
      const totalPrice = orderData.candles.reduce((acc, candle) => acc + candle.price, 0);
      const totalQuantity = orderData.candles.reduce((acc, candle) => acc + candle.quantity, 0);
      const { value: timeToDoOneCandle } = await this.configurationService.findParamByName(timeToDoOneCandleNameParam);

      const daysToDoCandles = Math.ceil(
        Math.ceil((totalQuantity * Number(timeToDoOneCandle)) / minutesOfHour) / workingHours,
      );

      const maxDayToDelivery = dayjs().set('month', monthMaxDelivery).set('date', dayMaxDelivery);
      let deliveryDate = dayjs(order.created_at).add(daysToDoCandles + minimumDaysToDoOrder, 'days');

      if (deliveryDate.isAfter(maxDayToDelivery)) {
        deliveryDate = maxDayToDelivery;
      }

      const bagsInDb = await this.bagRepository.listAllBagsAvailable();
      const maxCapacityBag = bagsInDb.shift();
      const individualBag = bagsInDb.pop();

      const updateOrderPayload: UpdateOrderAndDetailsDomain = {
        order: {
          id: order.id,
          total_price: totalPrice,
          total_quantity: totalQuantity,
          delivery_date: deliveryDate.toDate(),
          updated_at: dayjs().toDate(),
          updated_by: JSON.stringify({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }),
          delivery_address: orderData.delivery_address,
          additional_info: orderData.additional_info,
          delivery_price: orderData.delivery_price,
        },
        orderDetails: orderData.candles.map((candle) => {
          return {
            name_list: JSON.stringify(candle.name_list),
            price: candle.price,
            quantity: candle.quantity,
            observation: candle.observation,
            candle_option_id: candle.candle_option_id,
            order_id: order.id,
          };
        }),
        newBagInventoryNeed: [
          {
            bag_id: maxCapacityBag.id,
            quantity: Math.round(totalQuantity / maxCapacityBag.capacity),
            order_id: order.id,
          },
        ],
      };

      const temporaryBagsNeed: BagInventoryNeed[] = [];
      for (const detail of orderData.candles) {
        let candleToPackAlone = detail.name_list.filter((name) => name.packAlone).length;
        let RemindCandles = detail.quantity - candleToPackAlone;

        for (const bagDb of bagsInDb) {
          if (RemindCandles === 0) break;

          const bagQuantity = RemindCandles / bagDb.capacity;
          if (bagQuantity >= 1) {
            temporaryBagsNeed.push({
              bag_id: bagDb.id,
              quantity: Math.floor(bagQuantity),
              order_id: order.id,
            });
            RemindCandles -= Math.floor(bagQuantity) * bagDb.capacity;
          }
        }

        if (RemindCandles > 0) candleToPackAlone += RemindCandles;

        if (candleToPackAlone > 0) {
          temporaryBagsNeed.push({
            bag_id: individualBag.id,
            quantity: candleToPackAlone,
            order_id: order.id,
          });
        }
      }
      for (const bag of temporaryBagsNeed) {
        const indexBagsInventoryNeed = updateOrderPayload.newBagInventoryNeed.findIndex((x) => x.bag_id === bag.bag_id);

        if (indexBagsInventoryNeed !== -1) {
          updateOrderPayload.newBagInventoryNeed[indexBagsInventoryNeed].quantity += bag.quantity;
        } else {
          updateOrderPayload.newBagInventoryNeed.push(bag);
        }
      }
      if (order.status.order >= statusForCandleInventoryMovement.order) {
        /* INGRESAR INVENTORIO DE VELAS ANTIGUO */
        const oldCandlesAndQuantityKeyValue: { [candleTypeId: number]: number } = {};
        for (const orderDetail of order.orders_details) {
          const candleTypeId: number = orderDetail.candle_option.candle_type_id;
          const quantity: number = Number(orderDetail.quantity);
          if (oldCandlesAndQuantityKeyValue[candleTypeId]) {
            oldCandlesAndQuantityKeyValue[candleTypeId] += quantity;
          } else {
            oldCandlesAndQuantityKeyValue[candleTypeId] = quantity;
          }
        }
        updateOrderPayload.oldCandleInventoryMovement = Object.entries(oldCandlesAndQuantityKeyValue).map(
          ([candleTypeId, quantity]) => ({
            candle_type_id: parseInt(candleTypeId),
            quantity: quantity,
            is_entry: true,
            is_out: false,
            // eslint-disable-next-line max-len
            observation: `Entrada de inventario antiguo del pedido Nro ${order.code} por actualización del contenido del pedido`,
            created_by: JSON.stringify({
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }),
          }),
        );

        /* SACAR INVENTOARIO DE VELAS NUEVO */
        const newCandlesAndQuantityKeyValue: { [candleTypeId: number]: number } = {};
        for (const orderDetail of orderData.candles) {
          const candleTypeId: number = orderDetail.candle_type_id;
          const quantity: number = Number(orderDetail.quantity);
          if (newCandlesAndQuantityKeyValue[candleTypeId]) {
            newCandlesAndQuantityKeyValue[candleTypeId] += quantity;
          } else {
            newCandlesAndQuantityKeyValue[candleTypeId] = quantity;
          }
        }
        updateOrderPayload.newCandleInventoryMovement = Object.entries(newCandlesAndQuantityKeyValue).map(
          ([candleTypeId, quantity]) => ({
            candle_type_id: parseInt(candleTypeId),
            quantity: quantity,
            is_entry: false,
            is_out: true,
            // eslint-disable-next-line max-len
            observation: `Salida de inventario nuevo del pedido Nro ${order.code} por actualización del contenido del pedido`,
            created_by: JSON.stringify({
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }),
          }),
        );
      }

      if (order.status.order >= statusForBagInventoryMovement.order) {
        /* INGRESAR INVENTORIO DE BOLSAS ANTIGUO */
        const bagsNeed = await this.bagInventoryNeedRepository.getBagInventoryNeedForOrderByOrderCode(order.code);
        updateOrderPayload.oldBagInventoryNeedMovement = bagsNeed.map((bagNeed) => {
          return {
            bag_id: bagNeed.bag_id,
            quantity: bagNeed.quantity,
            is_entry: true,
            is_out: false,
            // eslint-disable-next-line max-len
            observation: `Entrada de inventario antiguo del pedido Nro ${order.code} por actualización del contenido del pedido`,
            created_by: JSON.stringify({
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }),
          };
        });
        /* SACAR INVENTOARIO DE VELAS NUEVO */
        updateOrderPayload.newBagInventoryNeedMovement = updateOrderPayload.newBagInventoryNeed.map((bagNeed) => {
          return {
            bag_id: bagNeed.bag_id,
            quantity: bagNeed.quantity,
            is_entry: false,
            is_out: true,
            // eslint-disable-next-line max-len
            observation: `Salida de inventario nuevo del pedido Nro ${order.code} por actualización del contenido del pedido`,
            created_by: JSON.stringify({
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }),
          };
        });
      }
      await this.orderRepository.updateOrderAndDetails(updateOrderPayload);
      return { message: orderSuccessMessages.service.updateOrderAndDetails.default };
    } catch (error) {
      const { message, status } = getErrorParams(error, orderErrorMessages.service.updateOrderAndDetails.default);
      throw new HttpException({ message }, status);
    }
  }

  async getOrderDetailsAndBagsByCode(orderCode: string): Promise<OrderDetailsAndBagsDomain> {
    const repositoryResponse = await this.orderRepository.getAllOrderInfoAndBagsByCode(orderCode);
    return OrderMapper.orderDetailsAnBagsMapper(repositoryResponse);
  }

  async editOrderByCode(orderCode: string): Promise<OrderAndDetailsDomain> {
    const repositoryResponse = await this.orderRepository.getOrderWithOnlyDetailByCode(orderCode);
    return OrderMapper.editOrderMapper(repositoryResponse);
  }

  async exportOrderToExcel(orderCode: string): Promise<{ buffer: any; fileName: string }> {
    const orderInfo = await this.orderRepository.getOrderAndDetailsByCode(orderCode);

    const orderWorkbook = new Workbook();
    const orderWorkSheet = orderWorkbook.addWorksheet('Encabezado');
    orderWorkSheet.columns = [
      { header: 'Nro Pedido', key: 'code', width: 11 },
      { header: 'Cliente', key: 'customerName', width: 28 },
      { header: 'Tipo de cliente', key: 'customerType', width: 15 },
      { header: 'Fecha de entrega', key: 'deliveryDate', width: 17 },
      { header: 'Dirección de entrega', key: 'deliveryAddress', width: 41 },
      { header: 'Cantidad total', key: 'totalQuantity', width: 14 },
      { header: 'Precio total', key: 'totalPrice', width: 12 },
      { header: 'Información adicional', key: 'additionalInfo', width: 22 },
    ];
    orderWorkSheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    orderWorkSheet.addRow({
      code: orderInfo.code,
      customerName: orderInfo.customer.name,
      customerType: orderInfo.customer.price_type,
      deliveryDate: orderInfo.delivery_date,
      deliveryAddress: orderInfo.delivery_address,
      totalQuantity: orderInfo.total_quantity,
      totalPrice: orderInfo.total_price,
      additionalInfo: orderInfo.additional_info === null ? '' : orderInfo.additional_info,
    });
    orderWorkSheet.getRow(2).eachCell((cell) => {
      cell.alignment = {
        wrapText: true,
        shrinkToFit: true,
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const detailsWorkSheet = orderWorkbook.addWorksheet('Detalles');
    detailsWorkSheet.columns = [
      { header: 'Tipo de vela', key: 'candleName', width: 38 },
      { header: 'Nombre', key: 'itemName', width: 22 },
      { header: 'Empacar solo', key: 'packAlone', width: 13 },
      { header: 'Difunto', key: 'deceased', width: 8 },
      { header: 'Mascota', key: 'pet', width: 9 },
      { header: 'Observaciones', key: 'observations', width: 31 },
      { header: 'Precio', key: 'price', width: 12 },
      { header: 'Cantidad', key: 'quantity', width: 9 },
    ];
    detailsWorkSheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    let lastColumn = 0;
    let rowCont = 2;
    for (const [detailIndex, detail] of orderInfo.orders_details.entries()) {
      const arrNameList: Array<{
        name: string;
        pack_alone: boolean;
        deceased: boolean;
        pet: boolean;
      }> = JSON.parse(detail.name_list);

      for (const [index, item] of arrNameList.entries()) {
        detailsWorkSheet.addRow({
          candleName: index === 0 ? detail.candle_option.name : '',
          itemName: item.name,
          packAlone: item.pack_alone ? 'Si' : 'No',
          deceased: item.deceased ? 'Si' : 'No',
          pet: item.pet ? 'Si' : 'No',
          observations: index === 0 ? detail.observation : '',
          price: index === 0 ? detail.price : '',
          quantity: index === 0 ? detail.quantity : '',
        });

        detailsWorkSheet.getRow(rowCont).eachCell((cell) => {
          cell.alignment = {
            wrapText: true,
            shrinkToFit: true,
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
        rowCont++;
      }

      detailsWorkSheet.getRow(detailIndex === 0 ? detailIndex + 2 : lastColumn + 2).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'e3b944' },
        };
      });
      lastColumn += arrNameList.length;
    }
    const buffer = await orderWorkbook.xlsx.writeBuffer();
    return { buffer: buffer, fileName: `Pedido-${orderInfo.code}-${orderInfo.customer.name}` };
  }
}
