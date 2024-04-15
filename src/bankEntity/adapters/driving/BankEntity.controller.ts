import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { BankEntityService } from '../../domain/inboundPorts/BankEntity.service';
import { bankEntityDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';

@ApiTags('bank_entity')
@ApiBearerAuth()
@Controller('bank_entity')
export class BankEntityController {
  constructor(private readonly bankEntityService: BankEntityService) {}

  @Get('/list')
  @ApiOperation({ summary: bankEntityDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: bankEntityDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  getBankEntitiesList() {
    return this.bankEntityService.listBankEntities();
  }
}
