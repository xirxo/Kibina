import { Event } from '../../typings/index.js';
import { Client } from '../extends/Client.js';
import { logger } from '../tools/logger.js';

export const event: Event = {
    name: 'ready',
    emitter: 'once',
    emit: (client: Client) => {
        return logger('info', `Logged in as ${client!.user?.tag}`);
    }
}