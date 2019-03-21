import { Injectable } from "@nestjs/common";
import { NestSchedule, Interval } from "@nestcloud/schedule";
import { InjectLogger } from '@nestcloud/logger';
import { LoggerInstance } from 'winston';
import { Bootstrap, BootValue } from '@nestcloud/boot';
import { Configuration, ConfigValue } from '@nestcloud/consul-config';
import { WatchKV } from '@nestcloud/consul';

@Injectable()
@Bootstrap()
@Configuration()
export class ScheduleService extends NestSchedule {
    @BootValue('custom.data', 'default custom data')
    private readonly customData: string;

    // In this project, the consul key is 'config__nestcloud-starter-service__development'
    // Please insert data in it.
    @ConfigValue('custom.data', 'default custom data')
    private readonly consulCustomData: string;

    // Please insert text into consul kv 'test-key'
    @WatchKV('test-key', 'text', 'default consul data')
    private readonly consulData: string;

    constructor(
        @InjectLogger() private readonly logger: LoggerInstance,
    ) {
        super();
    }

    @Interval(2000)
    intervalBootJob() {
        this.logger.info('interval get custom data from boot: ', this.customData);
    }

    @Interval(2000)
    intervalConsulConfigJob() {
        this.logger.info('interval get custom from consul config: ', this.consulCustomData);
    }

    @Interval(2000)
    intervalConsulJob() {
        this.logger.info('interval get custom from consul: ', this.consulData);
    }
}
