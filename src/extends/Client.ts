import { Client as BaseClient, ClientOptions, Collection } from 'discord.js';
import { Command } from '../../typings';
import { CommandCollection } from './CommandCollection.js';

export class Client extends BaseClient {
    constructor(option?: ClientOptions) {
        super(option);
    }

    public commands: Collection<string, Command> = new CommandCollection();
}