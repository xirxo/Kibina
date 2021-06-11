import { readdirSync } from 'fs';
import { Command, Data, Event } from '../typings/index.js';
import { settings } from './env.js';
import { Client } from './extends/Client.js';
import { CommandCollection } from './extends/CommandCollection.js';
import { logger } from './tools/logger.js';
import { Client as DiscordClient } from 'discord.js';
import mongoose from 'mongoose';
import * as data from './database/mongoose.js';

const client = new Client();
client.commands = new CommandCollection();
client.data = (data as unknown as Data);

async function main() {
    for (const file of readdirSync('./build/events/').filter(file => file.endsWith('.js'))) {
        const { event }: { event: Event } = await import(`./events/${file}`);

        logger('info', `${event.name} event loaded`);
        (client as DiscordClient)[event.emitter](event.name, (...args: unknown[]) => event.emit(...args, client));
    }

    readdirSync('./build/commands/').forEach(async (dir) => {
        for (const file of readdirSync(`./build/commands/${dir}/`).filter(file => file.endsWith('.js'))) {
            const { command }: { command: Command } = await import(`./commands/${dir}/${file}`);

            logger('info', `${command.name} command loaded`);
            client.commands.set(command.name, command);
        }
    });

    try {
        await client.login(settings.token);
        await mongoose.connect(settings.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        return logger('error', error.message);
    }
    
    logger('info', 'Connected to MongoDB Atlas');
}

console.clear();
main();