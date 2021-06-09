import { Message, MessageEmbed, Client } from 'discord.js';

declare module 'string-math';

export interface Command {
    name: string;
    category: string;
    aliases: string[];
    desc: string;
    cooldown: number;
    scope: 'dm' | 'guild' | 'any';
    nsfw: boolean;
    owner: boolean;
    execute: (argument: CommandArgs) => void;
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

export type LoggerType = 'info' | 'warn' | 'error';