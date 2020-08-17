import { Injectable } from '@nestjs/common';
import { UseRules } from '@nestcloud/loadbalance';
import { CustomLoadbalanceRule } from '../lb-rules/CustomLoadbalanceRule';

@Injectable()
@UseRules(CustomLoadbalanceRule)
export class LoadbalanceRuleRegistrar {
}
