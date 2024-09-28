import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { candleOptionValidations } from '../../../../core/constants';

export class CreateCandleOptionDto {
  @IsNotEmpty({ message: candleOptionValidations.createOption.nameIsRequired })
  @IsString({ message: candleOptionValidations.createOption.nameIsString })
  name: string;

  @IsNotEmpty({ message: candleOptionValidations.createOption.bulkPriceIsRequired })
  @Type(() => Number)
  @IsNumber({}, { message: candleOptionValidations.createOption.bulkPriceIsNumber })
  bulk_price: number;

  @IsNotEmpty({ message: candleOptionValidations.createOption.retailPriceIsRequired })
  @Type(() => Number)
  @IsNumber({}, { message: candleOptionValidations.createOption.retailPriceIsNumber })
  retail_price: number;

  @IsNotEmpty({ message: candleOptionValidations.createOption.isPackIsRequired })
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleOptionValidations.createOption.isPackIsBoolean })
  is_pack: boolean;

  @IsNotEmpty({ message: candleOptionValidations.createOption.candleTypeIdIsRequired })
  @Type(() => Number)
  @IsInt({ message: candleOptionValidations.createOption.candleTypeIdIsInt })
  candle_type_id: number;

  @IsNotEmpty({ message: candleOptionValidations.createOption.isVipPackIsRequired })
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleOptionValidations.createOption.isVipPackIsIsBoolean })
  is_vip_pack: boolean;

  @ValidateIf((request) => request.is_pack)
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray({ message: candleOptionValidations.createOption.packNamesIsArray })
  @ArrayNotEmpty({ message: candleOptionValidations.createOption.packNamesIsRequired })
  @IsString({ each: true, message: candleOptionValidations.createOption.packNamesIsStringArray })
  pack_names: string;
}
