import chalk from 'chalk';
import { LoggerType } from '../../typings';
import { time } from './time.js';

export function logger(type: LoggerType, message: string): void {
    switch (type.toLowerCase()) {
        case 'info':
            console.log(`[${time()}] [${chalk.blueBright(type.toUpperCase())}]: ${message}`);
            break;
        
        case 'warn':
            console.log(`[${time()}] [${chalk.keyword('orange')(type.toUpperCase())}]: ${message}`);
            break;
        
        case 'error':
            console.log(`[${time()}] [${chalk.red(type.toUpperCase())}]: ${message}`);
            break;
        
        default:
            console.log(`[${time()}] [${chalk.green(type.toUpperCase())}]: ${message}`);
            break;
    }
}