import { Module } from '@nestjs/common';
import { BootModule, Boot } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ConsulConfigModule } from '@nestcloud/consul-config';
import { ConsulServiceModule } from '@nestcloud/consul-service';
import { LoadbalanceModule } from '@nestcloud/consul-loadbalance';
import { FeignModule } from '@nestcloud/feign';
import { NEST_BOOT, NEST_CONSUL_LOADBALANCE, NEST_BOOT_PROVIDER, NEST_TYPEORM_LOGGER_PROVIDER } from '@nestcloud/common';
import { TypeOrmHealthIndicator, TerminusModule, TerminusModuleOptions } from "@nestjs/terminus";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from '@nestcloud/gateway';

import { components, repos } from "./utils/ProviderUtils";
import * as controllers from './controllers';
import * as repositories from './repositories';
import * as services from './services';
import * as clients from './clients';
import { LoggerModule, TypeormLogger } from '@nestcloud/logger';

const getTerminusOptions = (db: TypeOrmHealthIndicator): TerminusModuleOptions => ({
    endpoints: [
        {
            url: '/health',
            healthIndicators: [
                async () => db.pingCheck('database', { timeout: 300 }),
            ],
        },
    ],
});

@Module({
    imports: [
        LoggerModule.register(),
        BootModule.register(__dirname, `bootstrap-${ process.env.NODE_ENV || 'development' }.yml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulConfigModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
        FeignModule.register({ dependencies: [NEST_CONSUL_LOADBALANCE] }),
        GatewayModule.register({ dependencies: [NEST_BOOT] }),
        TerminusModule.forRootAsync({
            inject: [TypeOrmHealthIndicator],
            useFactory: db => getTerminusOptions(db as TypeOrmHealthIndicator),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: Boot, logger: TypeormLogger) => ({
                type: 'mysql',
                host: config.get('dataSource.host', 'localhost'),
                port: config.get('dataSource.port', 3306),
                username: config.get('dataSource.username', 'root'),
                password: config.get('dataSource.password', ''),
                database: config.get('dataSource.database', 'nestcloud_user'),
                entities: [__dirname + '/entities/*{.ts,.js}'],
                synchronize: config.get('dataSource.synchronize', false),
                maxQueryExecutionTime: config.get('dataSource.maxQueryExecutionTime', 1000),
                logging: ['error', 'warn'],
                logger,
            }),
            inject: [NEST_BOOT_PROVIDER, NEST_TYPEORM_LOGGER_PROVIDER],
        })
    ],
    controllers: components(controllers),
    providers: components(repos(repositories), services, clients)
})
export class AppModule {
}
