import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../../domain/inboundPorts/Customer.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findByEmailDomain } from '../../domain/model/findByEmailDomain';
import { createCustomerDto } from '../model/createCustomer.dto';
import { commonStatusErrorMessages, customerDocumentationLabels } from '../../../../core/constants';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/find/:email')
  @ApiOperation({ summary: customerDocumentationLabels.findOperation.summary })
  @ApiResponse({ status: 200, description: customerDocumentationLabels.findOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'email',
    description: customerDocumentationLabels.findOperation.emailParamDescription,
    required: true,
    type: 'string',
    example: 'example@example.com',
  })
  async findByEmail(@Param('email') email: string): Promise<findByEmailDomain> {
    return await this.customerService.findCustomer(email);
  }

  @Post('/create')
  @ApiOperation({ summary: customerDocumentationLabels.createOperation.summary })
  @ApiResponse({ status: 200, description: customerDocumentationLabels.createOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async create(@Body() clienteData: createCustomerDto): Promise<{ message: string }> {
    return await this.customerService.create(clienteData);
  }
}
