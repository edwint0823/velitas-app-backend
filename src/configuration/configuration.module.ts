import { Module } from '@nestjs/common';
import { ConfigurationController } from './adapters/driving/Configuration.controller';
import { ConfigurationService } from './domain/inboundPorts/Configuration.service';
import { IConfigurationRepository } from './domain/outboundPorts/IConfigurationRepository';
import { ConfigurationRepository } from './adapters/driven/Configuration.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationEntity } from '../../database/entities/Configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationEntity])],
  controllers: [ConfigurationController],
  providers: [
    ConfigurationService,
    { provide: IConfigurationRepository, useClass: ConfigurationRepository },
  ],
})
export class ConfigurationModule {}
