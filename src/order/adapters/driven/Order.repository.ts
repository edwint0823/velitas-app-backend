import { OrderEntity } from '../../../../database/entities/Order.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { orderErrorMessages, QUERYS } from '../../../../core/constants';
import { IOrderRepository } from '../../domain/outboundPorts/IOrderRepository';
import { IOrderDetailRepository } from '../../../orderDetail/domain/outboundPorts/IOrderDetailRepository';
// eslint-disable-next-line max-len
import { IBagInventoryNeedRepository } from '../../../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { IOrderStatusRepository } from '../../../orderStatus/domain/outboundPorts/IOrderStatusRepository';
import { ICreateOrderInfoDomain } from '../../domain/model/in/createOrderInfoDomain';
import { CreateOrderStatusLogDomain } from '../../../orderStatus/domain/model/in/createOrderStatusLogDomain';

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
            this.orderDetailsRepository.createOrderDetailByTransactionId(orderDetail, entityManager),
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

  async getOrderByCode(code: string): Promise<OrderEntity> {
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
}
