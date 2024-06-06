import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { CandleOptionService } from '../../domain/inboundPorts/CandleOption.service';

@ApiTags('candle_options')
@Controller('candle_options')
export class CandleOptionController {
  constructor(private readonly candleOptionService: CandleOptionService) {}
}
