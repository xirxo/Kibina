import { Client as BaseClient, ClientOptions, Collection } from 'discord.js';
import { Command, Data } from '../../typings';
import { settings } from '../env';
import { CommandCollection } from './CommandCollection.js';

export class Client extends BaseClient {
    constructor(option?: ClientOptions) {
        super(option);
    }

    public commands: Collection<string, Command> = new CommandCollection();
    public data: Data | undefined = undefined;
}