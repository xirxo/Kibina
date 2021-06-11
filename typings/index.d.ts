import { Message, MessageEmbed, Client } from 'discord.js';

export interface Data {
    getGuild: (id: string) => Promise<GuildDB | null>;
    getUser: (id: string) => Promise<UserDB | null>;
}

export interface DataObject {
    guild: GuildDB | null;
    user: UserDB | null;
}

export interface GuildDB {
    id: string;
    prefix?: string;
}

export interface UserDB {
    id: string;
    inv?: string[];
    money?: number;
}

export interface Command {
    name: string;
    category: string;
    aliases: string[];
    desc: string;
    cooldown: number;
    scope: 'dm' | 'guild' | 'any';
    nsfw: boolean;
    owner: boolean;
    guildOwner: boolean;
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
    data: DataObject;
}

export type LoggerType = 'info' | 'warn' | 'error';