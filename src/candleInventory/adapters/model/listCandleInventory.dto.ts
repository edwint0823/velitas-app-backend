import { IsOptional, IsString } from 'class-validator';
import { candleInventoryValidationMessages, IAuthUser } from '../../../../core/constants';

export class ListCandleInventoryDto {
  @IsOptional()
  @IsString({ message: candleInventoryValidationMessages.listOperation.nameIsString })
  name: string;

  user: IAuthUser;
}
