import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { candleOptionValidations } from '../../../../core/constants';

export class UpdateCandleOptionDto {
  @IsOptional()
  @IsString({ message: candleOptionValidations.updateOption.nameIsString })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: candleOptionValidations.updateOption.bulkPriceIsNumber })
  bulk_price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: candleOptionValidations.updateOption.retailPriceIsNumber })
  retail_price?: number;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => {
    if (value === undefined || value === '') return undefined;
    return value === 'true';
  })
  @IsBoolean({ message: candleOptionValidations.updateOption.isPackIsBoolean })
  is_pack?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => {
    if (value === undefined || value === '') return undefined;
    return value === 'true';
  })
  @IsBoolean({ message: candleOptionValidations.updateOption.isVisibleIsBoolean })
  is_visible?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => {
    if (value === undefined || value === '') return undefined;
    return value === 'true';
  })
  @IsBoolean({ message: candleOptionValidations.updateOption.isVipPackIsIsBoolean })
  is_vip_pack?: boolean;

  @IsOptional()
  @ValidateIf((request) => request.is_pack)
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray({ message: candleOptionValidations.updateOption.packNamesIsArray })
  @IsString({ each: true, message: candleOptionValidations.updateOption.packNamesIsStringArray })
  pack_names?: string[];
}
