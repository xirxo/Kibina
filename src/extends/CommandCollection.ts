import { Collection as BaseCollection } from 'discord.js';
import { Command } from '../../typings/index.js';

export class CommandCollection extends BaseCollection<string, Command> {
    constructor() {
        super()
    }
}