import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICandleOptionService } from './ICandleOptionService';
import { ICandleOptionRepository } from '../outboundPorts/ICandleOptionRepository';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';
import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { CandleOptionMapper } from '../mappers/CandleOption.mapper';
import { CreateCandleOptionDto } from '../../adapters/model/createCandleOption.dto';
import { CloudinaryService } from '../../../cloudinary/domain/inboundPorts/Clouddinary.service';
import { candleOptionErrorMessages, candleOptionSuccessMessages } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { UpdateCandleOptionDto } from '../../adapters/model/updateCandleOption.dto';
import { FindCandleOptionDomain } from '../model/out/findCandleOptionDomain';

@Injectable()
export class CandleOptionService implements ICandleOptionService {
  constructor(
    @Inject(ICandleOptionRepository)
    private readonly candleOptionRepository: ICandleOptionRepository,
    @Inject(CloudinaryService)
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async listAllOptions(pageSize: number, pageNumber: number, query?: ListAllOptionsDto): Promise<ListAllCandleOptions> {
    const whereOptions = {};
    if (query.is_pack) {
      whereOptions['is_pack'] = query.is_pack;
    }
    if (query.candle_type_id) {
      whereOptions['candle_type_id'] = query.candle_type_id;
    }
    if (query.visible) {
      whereOptions['visible'] = query.visible;
    }
    if (query.is_vip_pack) {
      whereOptions['is_vip_pack'] = query.is_vip_pack;
    }
    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.candleOptionRepository.listAllOptions(skip, pageSize, whereOptions);
    return CandleOptionMapper.listAllOptionsMapper(repositoryResponse);
  }

  async createOption(file: Express.Multer.File, body: CreateCandleOptionDto): Promise<{ message: string }> {
    try {
      const fileUploaded = await this.cloudinaryService.upload(file);
      const payload = {
        name: body.name,
        url_image: fileUploaded.secure_url,
        bulk_price: body.bulk_price,
        retail_price: body.retail_price,
        is_pack: body.is_pack,
        candle_type_id: body.candle_type_id,
        visible: true,
        is_vip_pack: body.is_vip_pack,
        pack_names:
          body.pack_names !== ''
            ? body.pack_names.split(',').map((name) => {
                return { name };
              })
            : [],
      };
      await this.candleOptionRepository.createOption(payload);
      return { message: candleOptionSuccessMessages.service.create.default };
    } catch (e) {
      const { message, status } = getErrorParams(e, candleOptionErrorMessages.serviceErrors.createOption.default);
      throw new HttpException({ message }, status);
    }
  }

  async updateCandleOption(
    file: Express.Multer.File | undefined,
    body: UpdateCandleOptionDto,
    candle_option_id: string,
  ): Promise<{
    message: string;
  }> {
    try {
      let oldUrlImage = null;
      const payload = {
        name: body.name !== '' ? body.name : null,
        url_image: null,
        bulk_price: body.bulk_price !== 0 ? body.bulk_price : null,
        retail_price: body.retail_price !== 0 ? body.retail_price : null,
        is_pack: body.is_pack !== undefined ? body.is_pack : null,
        visible: body.is_visible !== undefined ? body.is_visible : null,
        is_vip_pack: body.is_vip_pack !== undefined ? body.is_vip_pack : null,
        pack_names:
          body.pack_names.length === 1 && body.pack_names.includes('')
            ? null
            : body.pack_names.map((p) => {
                return { name: p };
              }),
      };
      if (file) {
        const newFileUploaded = await this.cloudinaryService.upload(file);
        const oldCandleOptionInfo = await this.candleOptionRepository.findCandleOptionById(parseInt(candle_option_id));
        oldUrlImage = oldCandleOptionInfo.url_image;
        payload.url_image = newFileUploaded.secure_url;
      }

      await this.candleOptionRepository.updateOption(parseInt(candle_option_id), payload);
      if (oldUrlImage) {
        const nameArr = oldUrlImage.split('/');
        const name = nameArr[nameArr.length - 1];
        const [publicId] = name.split('.');
        await this.cloudinaryService.destroy(publicId);
      }
      return Promise.resolve({ message: candleOptionSuccessMessages.service.updateOption.default });
    } catch (e) {
      const { message, status } = getErrorParams(e, candleOptionErrorMessages.serviceErrors.updateOption.default);
      throw new HttpException({ message }, status);
    }
  }

  async findCandleOptionById(id: number): Promise<FindCandleOptionDomain> {
    const repositoryResponse = await this.candleOptionRepository.findCandleOptionById(id);
    if (!repositoryResponse) {
      throw new HttpException(
        { message: candleOptionErrorMessages.serviceErrors.findOption.candleOptionNotFound },
        HttpStatus.NOT_FOUND,
      );
    }
    return CandleOptionMapper.findCandleOptionMapper(repositoryResponse);
  }
}
