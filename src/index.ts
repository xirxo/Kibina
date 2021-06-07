import { readdirSync } from 'fs';
import { Command, Event } from '../typings/index.js';
import { settings } from './env.js';
import { Client } from './extends/Client.js';
import { CommandCollection } from './extends/CommandCollection.js';
import { logger } from './tools/logger.js';

const client = new Client();
client.commands = new CommandCollection();

async function main() {
    for (const file of readdirSync('./build/events/').filter(file => file.endsWith('.js'))) {
        const { event }: { event: Event } = await import(`./events/${file}`);

        logger('info', `${event.name} event loaded`);
        client[event.emitter](event.name, (...args: any) => event.emit(...args, client));
    }

    readdirSync('./build/commands/').forEach(async (dir) => {
        for (const file of readdirSync(`./build/commands/${dir}/`).filter(file => file.endsWith('.js'))) {
            const { command }: { command: Command } = await import(`./build/${dir}/${file}`);

            logger('info', `${command.name} command loaded`);
            client.commands.set(command.name, command);

            if (command.aliases && command.aliases.length)
                command.aliases.forEach(cmd => client.commands.set(cmd, command));
        }
    });


    await client.login(settings.token);
}
console.clear();
main();