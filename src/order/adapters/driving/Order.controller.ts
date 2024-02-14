import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createOrderDto } from '../model/orderCreate.dto';
import { OrderService } from '../../domain/inboundPorts/Order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  async createOrder(@Body() orderData: createOrderDto) {
    return await this.orderService.create(orderData);
  }
}
