import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { CustomerService } from '../../domain/inboundPorts/Customer.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findByEmailDomain } from '../../domain/model/out/findByEmailDomain';
import { createCustomerDto } from '../model/createCustomer.dto';
import { commonStatusErrorMessages, customerDocumentationLabels } from '../../../../core/constants';
import { paginateCustomers } from '../model/paginateCustomers.dto';

@ApiTags('customer')
@ApiBearerAuth()
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
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    clienteData: createCustomerDto,
  ): Promise<{ message: string }> {
    return await this.customerService.create(clienteData);
  }

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: customerDocumentationLabels.listPaginateOperation.summary })
  @ApiResponse({ status: 200, description: customerDocumentationLabels.listPaginateOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: customerDocumentationLabels.listPaginateOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: customerDocumentationLabels.listPaginateOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  async listCustomers(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: paginateCustomers,
  ) {
    return await this.customerService.paginateListCustomers(pageSize, pageNumber, query);
  }
}
