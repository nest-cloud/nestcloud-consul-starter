import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';

export function components(...components: any[]) {
    const results = [];
    components.forEach(component => {
        if (typeof component === 'function') {
            results.push(component);
        } else if (!!(typeof component === 'object' && component.provide)) {
            results.push(component);
        } else if (typeof component === 'object') {
            for (const key in component) {
                if (!component.hasOwnProperty(key)) {
                    continue;
                }
                results.push(component[key]);
            }
        }
    });
    return results;
}

export function repos(...repositories: any[]) {
    const results = [];
    repositories.forEach(repo => {
        if (typeof repo === 'function') {
            results.push(getCustomRepo(repo.name, repo));
        } else if (typeof repo === 'object') {
            for (const key in repo) {
                if (!repo.hasOwnProperty(key)) {
                    continue;
                }
                results.push(getCustomRepo(repo[key].name, repo[key]));
            }
        }
    });

    return results;
}

export function getRepo(name: string, entity) {
    return {
        provide: name,
        useFactory: (connection: Connection) => connection.getRepository(entity),
        inject: [getConnectionToken()],
    };
}

export function getCustomRepo(name: string, repo) {
    return {
        provide: name,
        useFactory: (connection: Connection) => connection.getCustomRepository(repo),
        inject: [getConnectionToken()],
    };
}
