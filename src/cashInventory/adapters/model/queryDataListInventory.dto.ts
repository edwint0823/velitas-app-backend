import { cashInventoryValidationMessages, IAuthUser } from '../../../../core/constants';
import { IsOptional, IsString } from 'class-validator';

export class QueryDataListInventoryDto {
  @IsOptional()
  @IsString({ message: cashInventoryValidationMessages.listOperation.nameIsString })
  name?: string;

  user: IAuthUser;
}
