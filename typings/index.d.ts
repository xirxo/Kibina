import { Message, MessageEmbed } from 'discord.js';
import { Client } from '../build/extends/Client.js';

export interface Command {
    name: string;
    execute: (argument: CommandArgs) => void;

    aliases?: string[];
    desc?: string;
    cooldown?: number;
    scope?: boolean | null
}

export interface Event {
    name: string;
    emitter: 'on' | 'once';
    emit: (...args: any) => void;
}

export interface CommandArgs {
    args: string[];
    client: Client;
    embed: MessageEmbed;
    msg: Message;
}

export type LoggerType = 'info' | 'warn' | 'error'