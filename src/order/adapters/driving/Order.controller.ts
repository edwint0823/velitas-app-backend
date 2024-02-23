import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createOrderDto } from '../model/orderCreate.dto';
import { OrderService } from '../../domain/inboundPorts/Order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Crear pedido con su detalle y bolsas a necesitar' })
  @ApiResponse({ status: 201, description: 'Pedido creada' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async createOrder(@Body() orderData: createOrderDto) {
    return await this.orderService.create(orderData);
  }

  @Get('/find_by_code/:code')
  @ApiOperation({
    summary: 'Buscar un pedido y su detalle por el codigo de pedido',
  })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiParam({
    name: 'code',
    description: 'codigo del pedido',
    required: true,
    type: 'string',
    example: '123456',
  })
  async findOrderByCode(@Param('code') code: string) {
    return await this.orderService.findByCode(code);
  }
}
