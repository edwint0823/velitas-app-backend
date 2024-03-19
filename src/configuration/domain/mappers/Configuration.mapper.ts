import { Injectable } from '@nestjs/common';
import { ConfigurationEntity } from '../../../../database/entities/Configuration.entity';
import { findParamByNameDomain } from '../model/findParamByNameDomain';
import { FunctionsHelper } from '../../../../core/Helper';

@Injectable()
export class ConfigurationMapper {
  public static findParamByNameMapper(
    entity: ConfigurationEntity | null,
  ): findParamByNameDomain {
    if (entity !== null) {
      let value: string | boolean | number = entity.value;
      if (FunctionsHelper.isBoolean(value)) {
        value = FunctionsHelper.convertToBoolean(value);
      } else if (FunctionsHelper.isNumber(value)) {
        value = FunctionsHelper.convertToNumber(value);
      }
      return {
        found: true,
        param: entity.param,
        value: value,
      };
    }
    return {
      found: false,
      param: '',
      value: '',
    };
  }
}
