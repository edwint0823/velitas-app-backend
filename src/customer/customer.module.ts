import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomerController } from './adapters/driving/Customer.controller';
import { CustomerService } from './domain/inboundPorts/Customer.service';
import { ICustomerRepository } from './domain/outboundPorts/ICustomerRepository';
import { CustomerRepository } from './adapters/driven/Customer.repository';
import { CustomerEntity } from '../../database/entities/Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, { provide: ICustomerRepository, useClass: CustomerRepository }],
})
export class CustomerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('customer/create', 'customer/list/:page_size/:page_number', 'customer/update/:email');
  }
}
