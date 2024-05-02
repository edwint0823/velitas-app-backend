import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../../database/entities/Order.entity';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';
import { PaginateOrderDomain } from '../model/out/paginateOrderDomain';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { timeZoneDayjs } from '../../../../core/constants';
import { OrderDetailsAndBagsDomain } from '../model/out/orderDetailsAndBagsDomain';
import { OrderAndDetailsDomain } from '../model/out/editOrderAndDetailsDomain';

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
      deliveryAddress: order.delivery_address,
      deliveryPrice: order.delivery_price,
      additionalInfo: order.additional_info,
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
          delivery_address: order.delivery_address,
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

  public static orderDetailsAnBagsMapper(order: OrderEntity): OrderDetailsAndBagsDomain {
    return {
      code: order.code,
      totalPrice: order.total_price,
      totalQuantity: order.total_quantity,
      deliveryDate: dayjs(order.delivery_date).format('YYYY-MM-DD'),
      deliveryPrice: order.delivery_price,
      deliveryAddress: order.delivery_address,
      additionalInfo: order.additional_info,
      createdAt: dayjs(order.created_at).format('YYYY-MM-DD'),
      customerName: order.customer.name,
      customerPriceType: order.customer.price_type,
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
      bagsNeed: order.bag_inventory_needs.map((bagsInventoryNeed) => {
        return {
          name: bagsInventoryNeed.bag.name,
          quantity: bagsInventoryNeed.quantity,
        };
      }),
      payments: order.payments.map((payment) => {
        return {
          isPartial: payment.partial,
          amount: payment.movement.amount,
          bankEntityName: payment.movement.bank_entity.name,
          concept: payment.movement.concept,
          createdAt: dayjs(payment.movement.created_at).format('YYYY-MM-DD'),
        };
      }),
    };
  }

  public static editOrderMapper(order: OrderEntity): OrderAndDetailsDomain {
    return {
      code: order.code,
      customerName: order.customer.name,
      customerPriceType: order.customer.price_type,
      statusName: order.status.name,
      publicStatusName: order.status.public_name,
      deliveryPrice: order.delivery_price ? order.delivery_price : 0,
      deliveryAddress: order.delivery_address,
      additionalInfo: order.additional_info ? order.additional_info : '',
      details: order.orders_details.map((detail) => {
        return {
          id: detail.id,
          nameList: JSON.parse(detail.name_list).map((item, index: number) => {
            return {
              idx: index,
              ...item,
            };
          }),
          price: detail.price,
          quantity: detail.quantity,
          observation: detail.observation,
          candleOptionId: detail.candle_option_id,
          nameToAdd: '',
        };
      }),
    };
  }
}
