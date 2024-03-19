import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagController } from './adapters/driving/Bag.controller';
import { BagService } from './domain/inboundPorts/Bag.service';
import { IBagRepository } from './domain/outboundPorts/IBagRepository';
import { BagRepository } from './adapters/driven/Bag.repository';
import { BagEntity } from '../../database/entities/Bag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BagEntity])],
  controllers: [BagController],
  providers: [BagService, { provide: IBagRepository, useClass: BagRepository }],
})
export class BagModule {}
