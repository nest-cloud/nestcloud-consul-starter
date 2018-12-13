import { getCustomRepo } from "../providers";

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
