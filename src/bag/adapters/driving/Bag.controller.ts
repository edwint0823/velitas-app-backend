import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BagService } from '../../domain/inboundPorts/Bag.service';
import { commonStatusErrorMessages, bagDocumentationLabels } from '../../../../core/constants';

@ApiTags('bag')
@Controller('bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Get('/list')
  @ApiOperation({
    summary: bagDocumentationLabels.listOperation.summary,
  })
  @ApiResponse({ status: 200, description: bagDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async findAllAvailableInventory() {
    return this.bagService.getBagsAvailable();
  }
}
