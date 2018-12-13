import { createConnection } from 'typeorm';
import * as path from 'path';
import { Boot, BOOTSTRAP_PROVIDER } from 'nest-boot';
import { TypeormLogger } from '../logger';

export const DatabaseProvider = {
    provide: 'connection',
    useFactory: async (config: Boot) => {
        return await createConnection({
            type: 'mysql',
            host: config.get('dataSource.host', 'localhost'),
            port: config.get('dataSource.port', 3306),
            username: config.get('dataSource.username', 'root'),
            password: config.get('dataSource.password', ''),
            database: config.get('dataSource.database', 'nestcloud_user'),
            entities: [path.resolve(__dirname, '../') + '/entities/*{.ts,.js}'],
            synchronize: config.get('dataSource.synchronize', false),
            maxQueryExecutionTime: config.get('dataSource.maxQueryExecutionTime', 1000),
            logging: ['error', 'warn'],
            logger: new TypeormLogger(),
            // subscribers: [EntitySubscriber],
        });
    },
    inject: [BOOTSTRAP_PROVIDER],
};
