import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { PaymentService } from '../../domain/inboundPorts/Payment.service';
import { commonStatusErrorMessages, paymentDocumentationLabels } from '../../../../core/constants';

@ApiTags('payment')
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/payments_by_order/:order_code')
  @ApiOperation({ summary: paymentDocumentationLabels.getPaymentsByOrderCode.summary })
  @ApiResponse({ status: 200, description: paymentDocumentationLabels.getPaymentsByOrderCode.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: paymentDocumentationLabels.getPaymentsByOrderCode.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '123456',
  })
  getPaymentsByOrderCode(@Param('order_code') order_code: string) {
    return this.paymentService.getPaymentsByOrderCode(order_code);
  }
}
