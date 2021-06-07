import { readdirSync } from 'fs';
import { Event } from '../typings/index.js';
import { settings } from './env.js';
import { Client } from './extends/Client.js';
import { CommandCollection } from './extends/CommandCollection.js';

const client = new Client();
client.commands = new CommandCollection();

async function main() {
    for (const file of readdirSync('./build/events').filter(file => file.endsWith('.js'))) {
        const { event }: { event: Event } = await import(`./events/${file}`);

        client[event.emitter](event.name, (...args: any) => event.emit(...args, client));
    }


    console.clear();
    await client.login(settings.token);
}

main();