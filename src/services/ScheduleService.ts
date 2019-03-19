import { Injectable } from "@nestjs/common";
import { NestSchedule, Interval } from "@nestcloud/schedule";
import { InjectLogger } from '@nestcloud/logger';
import { LoggerInstance } from 'winston';

@Injectable()
export class ScheduleService extends NestSchedule {
    constructor(
        @InjectLogger() private readonly logger: LoggerInstance,
    ) {
        super();
    }

    @Interval(2000)
    intervalJob() {
        this.logger.info('executing interval job')
    }
}
