import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestcloud/schedule';
import { InjectLogger } from '@nestcloud/logger';
import { BootValue } from '@nestcloud/boot';
import { ConfigValue } from '@nestcloud/config';
import { Schedule } from '@nestcloud/schedule';

@Injectable()
export class ScheduleService implements OnModuleInit {
  @BootValue('custom.data', 'default custom data')
  private readonly customData: string;

  // In this project, the consul key is 'nestcloud-starter-service-config'
  // Please insert data in it.
  @ConfigValue('test', 'default custom data')
  private readonly consulCustomData: string;

  public constructor(
    @InjectLogger() private readonly logger: Logger,
    private schedule: Schedule,
  ) {
  }

  onModuleInit(): any {
    this.schedule.createTimeoutJob(() => {
      this.logger.log('execute timeout job');
    }, 3000);
  }

  @Interval(2000)
  intervalBootJob() {
    this.logger.log(`interval get custom data from boot: ${this.customData}`);
  }

  @Interval(2000)
  intervalConsulConfigJob() {
    this.logger.log(`interval get custom from consul config: ${this.consulCustomData}`);
  }
}
