import { Module } from '@nestjs/common';
import { CustomerController } from './adapters/driving/Customer.controller';
import { CustomerService } from './domain/inboundPorts/Customer.service';
import { ICustomerRepository } from './domain/outboundPorts/ICustomerRepository';
import { CustomerRepository } from './adapters/driven/Customer.repository';
import { CustomerEntity } from '../../database/entities/Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
})
export class CustomerModule {}
