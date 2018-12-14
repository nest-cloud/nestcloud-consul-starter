import { Injectable } from "@nestjs/common";
import { NestSchedule, Interval } from "nest-schedule";

@Injectable()
export class ScheduleService extends NestSchedule {
    @Interval(2000)
    intervalJob() {
        console.log('executing interval job')
    }
}
