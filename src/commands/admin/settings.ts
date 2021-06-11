import { Command } from '../../../typings/index';
import { settings } from '../../env.js';

export const command: Command = {
    name: 'settings',
    category: 'Admin',
    aliases: ['setting', 'config'],
    desc: 'Modify or set the bot settings for the current server',
    cooldown: 0,
    scope: 'guild',
    nsfw: false,
    owner: false,
    guildOwner: true,

    async execute({ client, args, msg, data }) {
        if (!args[0]) return msg.channel.send(`You must provide a setting to modify\n\`${data.guild?.prefix ?? settings.prefix}settings [setting] [new value]\`\n\nRun \`${data.guild?.prefix ?? settings.prefix}settings --list\` to get a list of all available settings`)
    }
}