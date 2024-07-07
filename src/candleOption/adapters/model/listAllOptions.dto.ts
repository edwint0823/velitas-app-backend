import { candleOptionValidations, IAuthUser } from '../../../../core/constants';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ListAllOptionsDto {
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleOptionValidations.listAllOptionsOperation.isPackIsBoolean })
  is_pack?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: candleOptionValidations.listAllOptionsOperation.candleTypeIdIsInt })
  candle_type_id?: number;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleOptionValidations.listAllOptionsOperation.visibleIsBoolean })
  visible?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleOptionValidations.listAllOptionsOperation.isVipPackIsBoolean })
  is_vip_pack?: boolean;

  user: IAuthUser;
}
