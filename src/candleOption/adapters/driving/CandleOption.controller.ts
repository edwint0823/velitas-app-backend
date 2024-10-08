import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CandleOptionService } from '../../domain/inboundPorts/CandleOption.service';
import {
  candleOptionDocumentationLabels,
  candleOptionErrorMessages,
  commonStatusErrorMessages,
} from '../../../../core/constants';
import { ListAllOptionsDto } from '../model/listAllOptions.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateCandleOptionDto } from '../model/createCandleOption.dto';
import { UpdateCandleOptionDto } from '../model/updateCandleOption.dto';
import { OptionalImageValidationPipe } from '../../../../core/OptionalImageValidationPipe';

@ApiTags('candle_options')
@ApiBearerAuth()
@Controller('candle_options')
export class CandleOptionController {
  constructor(private readonly candleOptionService: CandleOptionService) {}

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: candleOptionDocumentationLabels.listAllOptionsOperation.summary })
  @ApiResponse({ status: 200, description: candleOptionDocumentationLabels.listAllOptionsOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'is_pack',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.isPackParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'candle_type_id',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.candleTypeIdParamDescription,
    required: false,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'visible',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.visibleParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'is_vip_pack',
    description: candleOptionDocumentationLabels.listAllOptionsOperation.isVipPackParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  async listAllOptions(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: ListAllOptionsDto,
  ) {
    return await this.candleOptionService.listAllOptions(pageSize, pageNumber, query);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: candleOptionDocumentationLabels.createOptionOperation.fileParamDescription,
        },
        name: {
          type: 'string',
          description: candleOptionDocumentationLabels.createOptionOperation.nameParamDescription,
        },
        bulk_price: {
          type: 'number',
          description: candleOptionDocumentationLabels.createOptionOperation.bulkPriceParamDescription,
        },
        retail_price: {
          type: 'number',
          description: candleOptionDocumentationLabels.createOptionOperation.retailPriceParamDescription,
        },
        is_pack: {
          type: 'boolean',
          description: candleOptionDocumentationLabels.createOptionOperation.isPackParamDescription,
        },
        candle_type_id: {
          type: 'number',
          description: candleOptionDocumentationLabels.createOptionOperation.candleTypeIdParamDescription,
        },
        is_vip_pack: {
          type: 'boolean',
          description: candleOptionDocumentationLabels.createOptionOperation.isVipPackParamDescription,
        },
        pack_names: {
          type: 'array',
          description: candleOptionDocumentationLabels.createOptionOperation.packNamesParamDescription,
        },
      },
      required: ['file', 'name', 'retail_price', 'bulk_price', 'is_pack', 'candle_type_id', 'is_vip_pack'],
    },
  })
  async createAnCandleOption(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000, message: 'Tamaño máximo del archivo es de 50 Kb' }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateCandleOptionDto,
  ) {
    if (!file) {
      throw new HttpException(
        { message: candleOptionErrorMessages.controllerErrors.createOption.fileRequired },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.candleOptionService.createOption(file, body);
  }

  @Patch('update/:candle_option_id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'candle_option_id',
    description: candleOptionDocumentationLabels.updateOptionOperation.candleOptionIdParamDescription,
    required: true,
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: candleOptionDocumentationLabels.updateOptionOperation.fileParamDescription,
        },
        name: {
          type: 'string',
          description: candleOptionDocumentationLabels.updateOptionOperation.nameParamDescription,
        },
        bulk_price: {
          type: 'number',
          description: candleOptionDocumentationLabels.updateOptionOperation.bulkPriceParamDescription,
        },
        retail_price: {
          type: 'number',
          description: candleOptionDocumentationLabels.updateOptionOperation.retailPriceParamDescription,
        },
        is_pack: {
          type: 'boolean',
          description: candleOptionDocumentationLabels.updateOptionOperation.isPackParamDescription,
        },
        is_visible: {
          type: 'boolean',
          description: candleOptionDocumentationLabels.updateOptionOperation.isVisibleParamDescription,
        },
        is_vip_pack: {
          type: 'boolean',
          description: candleOptionDocumentationLabels.updateOptionOperation.isVipPackParamDescription,
        },
        pack_names: {
          type: 'array',
          description: candleOptionDocumentationLabels.updateOptionOperation.packNamesParamDescription,
        },
      },
    },
  })
  async updateCandleOption(
    @UploadedFile(new OptionalImageValidationPipe())
    file: Express.Multer.File | undefined,
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    body: UpdateCandleOptionDto,
    @Param('candle_option_id') candle_option_id: string,
  ) {
    return await this.candleOptionService.updateCandleOption(file, body, candle_option_id);
  }

  @Get('/find/:id')
  @ApiOperation({ summary: candleOptionDocumentationLabels.findOptionOperation.summary })
  @ApiResponse({ status: 200, description: candleOptionDocumentationLabels.findOptionOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 404, description: candleOptionDocumentationLabels.findOptionOperation.candleOptionNotFound })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'id',
    description: candleOptionDocumentationLabels.findOptionOperation.idParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  async findCandleOption(@Param('id') id: number) {
    return await this.candleOptionService.findCandleOptionById(id);
  }
}
