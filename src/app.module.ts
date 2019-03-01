import { Module } from '@nestjs/common';
import { BootModule, Boot } from 'nest-boot';
import { ConsulModule } from 'nest-consul';
import { ConsulConfigModule } from 'nest-consul-config';
import { ConsulServiceModule } from 'nest-consul-service';
import { LoadbalanceModule } from 'nest-consul-loadbalance';
import { FeignModule } from 'nest-feign';
import { NEST_BOOT, NEST_CONSUL_LOADBALANCE, NEST_BOOT_PROVIDER } from 'nest-common';
import { DatabaseHealthIndicator, TerminusModule, TerminusModuleOptions } from "@nestjs/terminus";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'nest-gateway';

import { components, repos } from "./utils/ProviderUtils";
import * as controllers from './controllers';
import * as repositories from './repositories';
import * as services from './services';
import * as clients from './clients';
import { TypeormLogger } from "./logger";

const getTerminusOptions = (db: DatabaseHealthIndicator): TerminusModuleOptions => ({
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
        BootModule.register(__dirname, `bootstrap-${ process.env.NODE_ENV || 'development' }.yml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulConfigModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
        FeignModule.register({ dependencies: [NEST_CONSUL_LOADBALANCE] }),
        GatewayModule.register({ dependencies: [NEST_BOOT] }),
        TerminusModule.forRootAsync({
            inject: [DatabaseHealthIndicator],
            useFactory: db => getTerminusOptions(db as DatabaseHealthIndicator),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: Boot) => ({
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
                logger: new TypeormLogger(),
            }),
            inject: [NEST_BOOT_PROVIDER],
        })
    ],
    controllers: components(controllers),
    providers: components(repos(repositories), services, clients)
})
export class AppModule {
}
