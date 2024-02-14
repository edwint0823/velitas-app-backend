import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../../domain/inboundPorts/Customer.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findByEmailDomain } from '../../domain/model/findByEmailDomain';
import { createCustomerDto } from '../model/createCustomer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/find/:email')
  @ApiOperation({ summary: 'Buscar un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiParam({
    name: 'email',
    description: 'email del cliente ',
    required: true,
    type: 'string',
    example: 'example@example.com',
  })
  async findByEmail(@Param('email') email: string): Promise<findByEmailDomain> {
    return await this.customerService.findCustomer(email);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Crear un cliente' })
  @ApiResponse({ status: 200, description: 'Cliente creado' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async create(
    @Body() clienteData: createCustomerDto,
  ): Promise<{ message: string }> {
    return await this.customerService.create(clienteData);
  }
}
