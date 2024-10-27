import { Inject, Injectable } from '@nestjs/common';
import { IDashboardService } from './IDashboardService';
import { ProductionTotals } from '../model/out/productionTotals';
import { IOrderRepository } from '../../../order/domain/outboundPorts/IOrderRepository';
import { ICandleInventoryRepository } from '../../../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
import { IBagInventoryRepository } from '../../../bagInventory/domain/outboundPorts/IBagInventoryRepository';
import { IBankEntityRepository } from '../../../bankEntity/domain/outboundPorts/IBankEntityRepository';
import { DashboardMapper } from '../mappers/Dashboard.mapper';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(ICandleInventoryRepository)
    private readonly candleInventoryRepository: ICandleInventoryRepository,
    @Inject(IBagInventoryRepository)
    private readonly bagInventoryRepository: IBagInventoryRepository,
    @Inject(IBankEntityRepository)
    private readonly bankEntitiesRepository: IBankEntityRepository,
  ) {}

  async getProductionTotal(): Promise<ProductionTotals> {
    const totalOrder = await this.orderRepository.totalOrder();
    const candleWithLowQuantity = await this.candleInventoryRepository.getCandleWithLowInventory();
    const BagWithLowQuantity = await this.bagInventoryRepository.getBagWithLowInventory();
    const allEntities = await this.bankEntitiesRepository.listBankEntities();
    const countStatusOrder = await this.orderRepository.totalOrderByStatus();
    const payload = {
      totalOrder,
      candleWithLowQuantity,
      BagWithLowQuantity,
      allEntities,
      countStatusOrder,
    };
    return DashboardMapper.totalProductionMapper(payload);
  }
}
