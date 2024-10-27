import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../../domain/inboundPorts/Dashboard.service';
import { commonStatusErrorMessages, dashboardDocumentationLabels } from '../../../../core/constants';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('productionTotals')
  @ApiOperation({ summary: dashboardDocumentationLabels.productionTotals.summary })
  @ApiResponse({ status: 200, description: dashboardDocumentationLabels.productionTotals.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async getProductionTotals() {
    return await this.dashboardService.getProductionTotal();
  }
}
