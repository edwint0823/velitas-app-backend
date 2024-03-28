import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createOrderDto } from '../model/orderCreate.dto';
import { OrderService } from '../../domain/inboundPorts/Order.service';
import { FiltersListOrderDto } from '../model/filtersListOrder.dto';

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

  @Get('/paginate_list/:page_size/:page_number')
  @ApiOperation({
    summary: 'Listado paginado de pedidos',
  })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 401, description: 'Usuario no autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para realizar la acción' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiParam({
    name: 'page_size',
    description: 'Cantidad de items por pagina',
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: 'Número de pagina',
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiQuery({
    name: 'orders_code',
    description: 'Listado de códigos de pedido',
    required: false,
    example: '123456,122334',
    type: 'string',
  })
  @ApiQuery({
    name: 'delivery_date_begin',
    description: 'Fecha inicial de fecha estimada de entrega',
    required: false,
    type: 'string',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'delivery_date_end',
    description: 'Fecha final de fecha estimada de entrega',
    required: false,
    type: 'string',
    example: '2024-03-24',
  })
  @ApiQuery({
    name: 'created_at_begin',
    description: 'Fecha inicial para fecha de creación del pedido',
    required: false,
    type: 'date',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'created_at_end',
    description: 'Fecha final para fecha de creación del pedido',
    required: false,
    type: 'date',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'customer_name',
    description: 'Nombre del cliente',
    required: false,
    example: 'EDWIN',
    type: 'string',
  })
  async paginateListOrders(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    filters?: FiltersListOrderDto,
  ) {
    return await this.orderService.getPaginateListOrders(pageSize, pageNumber, filters);
  }
}
