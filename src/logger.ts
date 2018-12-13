import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import * as winston from 'winston';
import * as mkdirp from 'mkdirp';
import { Boot } from 'nest-boot';
import { Logger, QueryRunner } from 'typeorm';
import { LoggerService } from '@nestjs/common';

const logPath = path.resolve(__dirname, '../logs');
const boot = new Boot(__dirname);
const service = boot.get('web.serviceName');
const maxSize = 100 * 1024 * 1024;

if (!fs.existsSync(logPath)) {
    mkdirp.sync(logPath);
}

export const logger = new winston.Logger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transports: [
        new winston.transports.Console({
            colorize: true,
            label: service,
            timestamp: () => moment(new Date().getTime()).format('YYYY-MM-DD h:mm:ss'),
        }),
        new winston.transports.File({
            name: 'info-file',
            filename: path.resolve(logPath, 'log.log'),
            maxsize: maxSize,
            label: service,
            timestamp: () => moment(new Date().getTime()).format('YYYY-MM-DD h:mm:ss'),
        }),
        new winston.transports.File({
            name: 'error-file',
            filename: path.resolve(logPath, 'log-error.log'),
            maxsize: maxSize,
            level: 'error',
            label: service,
            timestamp: () => moment(new Date().getTime()).format('YYYY-MM-DD h:mm:ss'),
        }),
    ],
});

export class TypeormLogger implements Logger {
    log(level, message: any, queryRunner?: QueryRunner): any {
        logger.log(level, message);
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.debug(query, JSON.stringify(parameters));
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.error(error, query, JSON.stringify(parameters));
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.warn(query, JSON.stringify(parameters), `usedTime: ${time}`);
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    }
}

export class NestLogger implements LoggerService {
    log(message: string) {
        logger.info(message);
    }

    error(message: string, trace: string) {
        logger.error(message, trace);
    }

    warn(message: string) {
        logger.warn(message);
    }
}