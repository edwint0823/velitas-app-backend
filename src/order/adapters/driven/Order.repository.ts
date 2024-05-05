import { OrderEntity } from '../../../../database/entities/Order.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { orderErrorMessages, QUERYS } from '../../../../core/constants';
import { IOrderRepository } from '../../domain/outboundPorts/IOrderRepository';
import { IOrderDetailRepository } from '../../../orderDetail/domain/outboundPorts/IOrderDetailRepository';
// eslint-disable-next-line max-len
import { IBagInventoryNeedRepository } from '../../../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { IOrderStatusRepository } from '../../../orderStatus/domain/outboundPorts/IOrderStatusRepository';
// eslint-disable-next-line max-len
import { ICandleInventoryMovementRepository } from '../../../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../../../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
import { ICreateOrderInfoDomain } from '../../domain/model/in/createOrderInfoDomain';
import { CreateOrderStatusLogDomain } from '../../../orderStatus/domain/model/in/createOrderStatusLogDomain';
import { UpdateOrderAndDetailsDomain } from '../../domain/model/in/updateOrderAndDetailsDomain';
import { skip, take } from 'rxjs';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> implements IOrderRepository {
  constructor(
    public readonly dataSource: DataSource,
    @Inject(IOrderDetailRepository)
    private readonly orderDetailsRepository: IOrderDetailRepository,
    @Inject(IBagInventoryNeedRepository)
    private readonly bagInventoryNeedRepository: IBagInventoryNeedRepository,
    @Inject(IOrderStatusRepository)
    private readonly orderStatusLogRepository: IOrderStatusRepository,
    @Inject(ICandleInventoryMovementRepository)
    private readonly candleInventoryMovementRepository: ICandleInventoryMovementRepository,
    @Inject(IBagInventoryMovementRepository)
    private readonly bagInventoryMovementRepository: IBagInventoryMovementRepository,
  ) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  async getCodeOrder(): Promise<string> {
    const dbResult = await this.query(QUERYS.callGetCodeOrderFunction);
    if (dbResult.length > 0 && dbResult[0] && dbResult[0].new_code) {
      return dbResult[0].new_code as string;
    }
    throw new Error(orderErrorMessages.repository.codeGenerate);
  }

  async createOrder(orderInfo: ICreateOrderInfoDomain): Promise<OrderEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<OrderEntity> => {
      try {
        const newOrder = new OrderEntity();
        Object.assign(newOrder, orderInfo.order);
        const orderSaved = await entityManager.save(newOrder);

        const orderDetailPromise = [];
        for (const orderDetail of orderInfo.orderDetails) {
          orderDetail.order_id = orderSaved.id;
          orderDetailPromise.push(
            this.orderDetailsRepository.createOrderDetailByTransaction(orderDetail, entityManager),
          );
        }
        await Promise.all(orderDetailPromise);

        const bagNeededPromise = [];
        for (const bagNeed of orderInfo.bagInventoryNeed) {
          bagNeed.order_id = orderSaved.id;
          bagNeededPromise.push(
            this.bagInventoryNeedRepository.createBagInventoryNeedByTransaction(bagNeed, entityManager),
          );
        }
        await Promise.all(bagNeededPromise);
        return orderSaved;
      } catch (err) {
        throw new Error(err);
      }
    });
  }

  async getOrderAndDetailsByCode(code: string): Promise<OrderEntity> {
    return this.findOne({
      relations: {
        orders_details: {
          candle_option: true,
        },
        status: true,
        customer: true,
      },
      where: {
        code: code,
      },
    });
  }

  async listOrdersPaginated(
    skip: number,
    take: number,
    whereOptions,
  ): Promise<{
    orders: OrderEntity[];
    total: number;
  }> {
    const orders = await this.find({
      where: { ...whereOptions },
      relations: {
        customer: true,
        status: true,
      },
      skip: skip,
      take: take,
    });

    const total = await this.count();
    return { orders, total };
  }

  async getOrderAndStatusByCode(code: string): Promise<OrderEntity> {
    return await this.findOne({ relations: { status: true }, where: { code: code } });
  }

  async updateStatusOrder(orderId: number, orderStatusPayload: CreateOrderStatusLogDomain): Promise<OrderEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<OrderEntity> => {
      const order = await this.findOneBy({ id: orderId });
      order.status_id = orderStatusPayload.new_status_id;
      await entityManager.save(order);
      await this.orderStatusLogRepository.createOrderStatusLogByTransaction(orderStatusPayload, entityManager);
      return order;
    });
  }

  async updateOrderAndDetails(orderAndDetailsInfo: UpdateOrderAndDetailsDomain): Promise<OrderEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<OrderEntity> => {
      const order = await this.findOne({ where: { id: orderAndDetailsInfo.order.id } });
      order.total_price = orderAndDetailsInfo.order.total_price;
      order.total_quantity = orderAndDetailsInfo.order.total_quantity;
      order.delivery_date = orderAndDetailsInfo.order.delivery_date;
      order.updated_by = orderAndDetailsInfo.order.updated_by;
      order.updated_at = orderAndDetailsInfo.order.updated_at;
      order.delivery_address = orderAndDetailsInfo.order.delivery_address;
      if (orderAndDetailsInfo.order.additional_info) {
        order.additional_info = orderAndDetailsInfo.order.additional_info;
      }
      if (orderAndDetailsInfo.order.delivery_price) {
        order.delivery_price = orderAndDetailsInfo.order.delivery_price;
      }
      const orderSaved = await entityManager.save(order);

      await this.orderDetailsRepository.deleteDetailsByOrderIdWithTransaction(order.id, entityManager);
      const orderDetailsPromise = [];
      for (const detail of orderAndDetailsInfo.orderDetails) {
        orderDetailsPromise.push(
          await this.orderDetailsRepository.createOrderDetailByTransaction(detail, entityManager),
        );
      }
      await Promise.all(orderDetailsPromise);

      await this.bagInventoryNeedRepository.deleteBagsInventoryNeedByOrderIdWithTransaction(order.id, entityManager);
      const bagInventoryNeedPromise = [];
      for (const bagNeed of orderAndDetailsInfo.newBagInventoryNeed) {
        bagInventoryNeedPromise.push(
          await this.bagInventoryNeedRepository.createBagInventoryNeedByTransaction(bagNeed, entityManager),
        );
      }
      await Promise.all(bagInventoryNeedPromise);

      if (orderAndDetailsInfo.oldCandleInventoryMovement && orderAndDetailsInfo.oldCandleInventoryMovement.length > 0) {
        for (const oldCandleInventoryMovement of orderAndDetailsInfo.oldCandleInventoryMovement) {
          await this.candleInventoryMovementRepository.createEntryCandleInventoryMovementByTransaction(
            oldCandleInventoryMovement,
            entityManager,
          );
        }

        for (const newCandleInventoryMovement of orderAndDetailsInfo.newCandleInventoryMovement) {
          await this.candleInventoryMovementRepository.createOutCandleInventoryMovementByTransaction(
            newCandleInventoryMovement,
            entityManager,
          );
        }
      }

      if (
        orderAndDetailsInfo.oldBagInventoryNeedMovement &&
        orderAndDetailsInfo.oldBagInventoryNeedMovement.length > 0
      ) {
        for (const oldBagInventoryMovement of orderAndDetailsInfo.oldBagInventoryNeedMovement) {
          await this.bagInventoryMovementRepository.createEntryInventoryMovementByTransaction(
            oldBagInventoryMovement,
            entityManager,
          );
        }

        for (const newBagInventoryMovement of orderAndDetailsInfo.newBagInventoryNeedMovement) {
          await this.bagInventoryMovementRepository.createOutInventoryMovementByTransaction(
            newBagInventoryMovement,
            entityManager,
          );
        }
      }
      return orderSaved;
    });
  }

  async getAllOrderInfoAndBagsByCode(code: string): Promise<OrderEntity> {
    return await this.findOne({
      relations: {
        customer: true,
        orders_details: {
          candle_option: true,
        },
        status: true,
        bag_inventory_needs: {
          bag: true,
        },
        payments: {
          movement: {
            bank_entity: true,
          },
        },
      },
      where: {
        code: code,
      },
    });
  }

  async getOrderWithOnlyDetailByCode(code: string): Promise<OrderEntity> {
    return await this.findOne({
      relations: { orders_details: true, customer: true, status: true },
      where: { code: code },
    });
  }
}
