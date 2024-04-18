import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Patch, Query } from '@nestjs/common';
import { bagInventoryDocumentationLabels, commonStatusErrorMessages, IAuthUser } from '../../../../core/constants';
import { UpdateInventoryQuantityDto } from '../model/updateInventoryQuantity.dto';
import { BagInventoryService } from '../../domain/InboundPorts/BagInventory.service';

@ApiTags('bag_inventory')
@ApiBearerAuth()
@Controller('bag_inventory')
export class BagInventoryController {
  constructor(private readonly bagInventoryService: BagInventoryService) {}

  @Patch('/update_quantity/:bag_id')
  @ApiOperation({ summary: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.summary })
  @ApiResponse({ status: 200, description: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'bag_id',
    description: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.bagIdParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  async addOrRemoveInventory(
    @Param('bag_id') bagId: number,
    @Body() inventoryInfo: UpdateInventoryQuantityDto,
    @Query('user') user: IAuthUser,
  ) {
    return await this.bagInventoryService.addOrRemoveBagInventory(bagId, inventoryInfo, user);
  }
}
