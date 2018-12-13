import { Module } from '@nestjs/common';
import { BootModule, BOOT_ADAPTER } from 'nest-boot';
import { ConsulModule } from 'nest-consul';
import { ConsulConfigModule } from 'nest-consul-config';
import { ConsulServiceModule } from 'nest-consul-service';
import { LoadbalanceModule } from 'nest-consul-loadbalance';
import { FeignModule, CONSUL_LOADBALANCE } from 'nest-feign';

import { components, repos } from "./utils/ProviderUtils";
import { DatabaseProvider } from "./providers";
import * as controllers from './controllers';
import * as repositories from './repositories';
import * as services from './services';
import * as clients from './clients';

@Module({
    imports: [
        BootModule.register(__dirname, `bootstrap-${ process.env.NODE_ENV || 'development' }.yml`),
        ConsulModule.register({ adapter: BOOT_ADAPTER }),
        ConsulConfigModule.register({ adapter: BOOT_ADAPTER }),
        ConsulServiceModule.register({ adapter: BOOT_ADAPTER }),
        LoadbalanceModule.register({ adapter: BOOT_ADAPTER }),
        FeignModule.register({ adapter: CONSUL_LOADBALANCE }),
    ],
    controllers: components(controllers),
    providers: components(DatabaseProvider, repos(repositories), services, clients)
})
export class AppModule {
}
