import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../../database/entities/Order.entity';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';
import { PaginateOrderDomain } from '../model/out/paginateOrderDomain';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

@Injectable()
export class OrderMapper {
  public static findOrderAndDetailsByCodeMapper(order: OrderEntity): FindOrderAndDetailsDomain {
    return {
      customerName: order.customer.name,
      totalPrice: order.total_price,
      deliveryDate: order.delivery_date,
      statusName: order.status.name,
      publicStatusName: order.status.public_name,
      orderDetails: order.orders_details.map((orderDetail) => {
        return {
          candleOptionName: orderDetail.candle_option.name,
          candleOptionUrlImage: orderDetail.candle_option.url_image,
          nameList: JSON.parse(orderDetail.name_list),
          price: orderDetail.price,
          quantity: orderDetail.quantity,
          observation: orderDetail.observation,
        };
      }),
    };
  }

  public static paginateOrder(repositoryResponse: { orders: OrderEntity[]; total: number }): PaginateOrderDomain {
    return {
      orders: repositoryResponse.orders.map((order) => {
        return {
          code: order.code,
          total_price: order.total_price,
          total_quantity: order.total_quantity,
          delivery_date: order.delivery_date,
          created_at: dayjs(order.created_at).format('YYYY-MM-DD'),
          customer_name: order.customer.name,
          customer_price_type: order.customer.price_type,
          status_id: order.status.id,
          status_name: order.status.name,
          status_public_name: order.status.public_name,
          status_order: order.status.order,
        };
      }),
      total: repositoryResponse.total,
    };
  }
}
