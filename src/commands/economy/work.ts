import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'daily',
    category: 'Economy',
    aliases: ['d'],
    desc: 'Use this command daily to get free money',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,
    guildOwner: false,

    async execute ({ data, embed }) {
        // ...
    }
}