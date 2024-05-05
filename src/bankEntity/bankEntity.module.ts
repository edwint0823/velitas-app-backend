import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntityEntity } from '../../database/entities/BankEntity.entity';
import { BankEntityController } from './adapters/driving/BankEntity.controller';
import { BankEntityService } from './domain/inboundPorts/BankEntity.service';
import { IBankEntityRepository } from './domain/outboundPorts/IBankEntityRepository';
import { BankEntityRepository } from './adapters/driven/BankEntity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntityEntity])],
  controllers: [BankEntityController],
  providers: [BankEntityService, { provide: IBankEntityRepository, useClass: BankEntityRepository }],
})
export class BankEntityModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('bank_entity');
  }
}
