import { StatusService } from '../../domain/inboundPorts/Status.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { commonStatusErrorMessages, statusDocumentationLabels } from '../../../../core/constants';

@ApiTags('status')
@ApiBearerAuth()
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/list_status/:order')
  @ApiOperation({
    summary: statusDocumentationLabels.listOperation.summary,
  })
  @ApiResponse({ status: 200, description: statusDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order',
    description: statusDocumentationLabels.listOperation.orderParam,
    required: true,
    type: 'number',
    example: 2,
  })
  async listStatus(@Param('order') order: number) {
    return this.statusService.statusList(order);
  }
}
