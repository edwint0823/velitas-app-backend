import { bagInventoryValidationMessages, IAuthUser } from '../../../../core/constants';
import { IsOptional, IsString } from 'class-validator';

export class listBagInventoryDto {
  @IsOptional()
  @IsString({ message: bagInventoryValidationMessages.listInventory.nameIsString })
  name: string;

  user: IAuthUser;
}
