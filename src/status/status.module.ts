import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from '../../database/entities/Status.entity';
import { StatusController } from './adapters/driving/Status.controller';
import { StatusService } from './domain/inboundPorts/Status.service';
import { IStatusRepository } from './domain/outboundPorts/IStatusRepository';
import { StatusRepository } from './adapters/driven/Status.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  controllers: [StatusController],
  providers: [StatusService, { provide: IStatusRepository, useClass: StatusRepository }],
})
export class StatusModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('status');
  }
}
