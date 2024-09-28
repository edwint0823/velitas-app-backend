import { OrderStatusChangeLogEntity } from '../../../../database/entities/OrderStatusChangeLogs.entity';
import { ListOrderStatusLogsDomain } from '../model/out/ListOrderStatusLogsDomain';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { IUserInfoInDb, timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

export class OrderStatusMapper {
  public static listOrderStatusChangeLogs(repositoryResponse: {
    items: OrderStatusChangeLogEntity[];
    total: number;
  }): ListOrderStatusLogsDomain {
    const items = repositoryResponse.items.map((changeLog) => {
      const userInfo: IUserInfoInDb = JSON.parse(changeLog.created_by);
      return {
        id: changeLog.id,
        orderCode: changeLog.order.code,
        oldStatusName: changeLog.old_status.name,
        newStatusName: changeLog.new_status.name,
        createdAt: dayjs(changeLog.created_at).format('YYYY-MM-DD'),
        createdByName: `${userInfo.first_name} ${userInfo.last_name}`,
      };
    });

    return { items: items, total: repositoryResponse.total };
  }
}
