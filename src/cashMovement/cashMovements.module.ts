import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashMovementEntity } from '../../database/entities/CashMovement.entity';
import { CashMovementController } from './adapters/driving/CashMovement.controller';
import { CashMovementService } from './domain/inboundPorts/CashMovement.service';
import { ICashMovementRepository } from './domain/outboundPorts/ICashMovementRepository';
import { CashMovementRepository } from './adapters/driven/CashMovement.repository';
import { IPaymentRepository } from '../payment/domain/outboundPorts/IPaymentRepository';
import { PaymentRepository } from '../payment/adapters/driven/Payment.repository';
import { IBankEntityRepository } from '../bankEntity/domain/outboundPorts/IBankEntityRepository';
import { BankEntityRepository } from '../bankEntity/adapters/driven/BankEntity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CashMovementEntity])],
  controllers: [CashMovementController],
  providers: [
    CashMovementService,
    {
      provide: ICashMovementRepository,
      useClass: CashMovementRepository,
    },
    { provide: IPaymentRepository, useClass: PaymentRepository },
    { provide: IBankEntityRepository, useClass: BankEntityRepository },
  ],
})
export class CashMovementsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('cash_movements');
  }
}
