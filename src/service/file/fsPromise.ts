import * as fs from 'fs';
import { promisify } from 'bluebird';

export const writeFile = promisify(fs.writeFile);
export const readFile = promisify(fs.readFile);
export const exists = (path: string) =>
    new Promise(resolve => {
        fs.exists(path, existsFlag => {
            resolve(existsFlag);
        });
    });

export const mkdir = promisify(fs.mkdir);
