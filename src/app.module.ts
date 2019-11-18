import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ConfigModule } from '@nestcloud/config';
import { ServiceModule } from '@nestcloud/service';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { FeignModule } from '@nestcloud/feign';
import { ScheduleModule } from '@nestcloud/schedule';
import {
  NEST_BOOT,
  NEST_LOADBALANCE,
  components,
  NEST_CONSUL,
} from '@nestcloud/common';
import { TypeOrmHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { ProxyModule } from '@nestcloud/proxy';

import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { LoggerModule } from '@nestcloud/logger';

@Module({
  imports: [
    LoggerModule.register(),
    ScheduleModule.register(),
    BootModule.register(__dirname, `bootstrap-${process.env.NODE_ENV || 'development'}.yml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    ServiceModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
    FeignModule.register({ dependencies: [NEST_LOADBALANCE] }),
    ProxyModule.register({ dependencies: [NEST_BOOT] }),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
    }),
  ],
  controllers: components(controllers),
  providers: components(services, clients),
})
export class AppModule {
}
