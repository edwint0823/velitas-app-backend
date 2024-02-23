import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../../database/entities/Order.entity';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';

@Injectable()
export class OrderMapper {
  public static findOrderAndDetailsByCodeMapper(
    order: OrderEntity,
  ): FindOrderAndDetailsDomain {
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
}
