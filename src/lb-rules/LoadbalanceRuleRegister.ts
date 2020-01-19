import { Injectable } from '@nestjs/common';
import { UseRules } from '@nestcloud/loadbalance';
import { CustomLoadbalanceRule } from './CustomLoadbalanceRule';

@Injectable()
@UseRules(CustomLoadbalanceRule)
export class LoadbalanceRuleRegister {
}
