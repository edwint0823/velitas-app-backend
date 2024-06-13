import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ICandleOptionService } from './ICandleOptionService';
import { ICandleOptionRepository } from '../outboundPorts/ICandleOptionRepository';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';
import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { CandleOptionMapper } from '../mappers/CandleOption.mapper';
import { CreateCandleOptionDto } from '../../adapters/model/createCandleOption.dto';
import { CloudinaryService } from '../../../cloudinary/domain/inboundPorts/Clouddinary.service';
import { candleOptionErrorMessages, candleOptionSuccessMessages } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';

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
      console.log(fileUploaded);
      console.log(body.pack_names);
      const payload = {
        name: body.name,
        url_image: fileUploaded.secure_url,
        bulk_price: body.bulk_price,
        retail_price: body.retail_price,
        is_pack: body.is_pack,
        candle_type_id: body.candle_type_id,
        visible: true,
        is_vip_pack: body.is_vip_pack,
        pack_names: body.pack_names.split(',').map((name) => {
          return { name };
        }),
      };
      await this.candleOptionRepository.createOption(payload);
      return Promise.resolve({ message: candleOptionSuccessMessages.service.default });
    } catch (e) {
      const { message, status } = getErrorParams(e, candleOptionErrorMessages.serviceErrors.createOption.default);
      throw new HttpException({ message }, status);
    }
  }
}
