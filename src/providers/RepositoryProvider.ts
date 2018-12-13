import { Connection } from 'typeorm';

export function getRepo(name: string, entity) {
    return {
        provide: name,
        useFactory: (connection: Connection) => connection.getRepository(entity),
        inject: ['connection'],
    };
}

export function getCustomRepo(name: string, repo) {
    return {
        provide: name,
        useFactory: (connection: Connection) => connection.getCustomRepository(repo),
        inject: ['connection'],
    };
}