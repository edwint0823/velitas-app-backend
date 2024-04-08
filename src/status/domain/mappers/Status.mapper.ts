import { Injectable } from '@nestjs/common';
import { StatusEntity } from '../../../../database/entities/Status.entity';
import { StatusListDomain } from '../model/out/listStatusDomain';

@Injectable()
export class StatusMapper {
  public static listStatusMapper(statusList: StatusEntity[]): StatusListDomain[] {
    return statusList.map((status) => {
      return {
        id: status.id,
        name: status.name,
        order: status.order,
      };
    });
  }
}
