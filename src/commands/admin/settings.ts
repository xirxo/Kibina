import { Command, GuildDB } from '../../../typings/index';
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

    async execute({ client, args, msg, data, embed }) {
        if (!args[0]) return msg.channel.send(`You must provide a setting to modify\n\`${data.guild?.prefix ?? settings.prefix}settings [setting] [new value]\`\n\nRun \`${data.guild?.prefix ?? settings.prefix}settings list\` to get a list of all available settings`);

        switch (args[0].toLowerCase()) {
            case 'list': {
                return msg.channel.send('Here\'s a list of all available settings\n`prefix`, `avatar`* and `username`*\n\n*Only for the bot owner');
            }

            case 'prefix': {
                if (!args[1]) return msg.channel.send(`You must provide a new prefix or \`reset\` to reset the prefix\n\`${data.guild?.prefix ?? settings.prefix}settings prefix ['reset' | new prefix]\``);
                if (args[1] === 'reset') {
                    (data.guild as GuildDB).prefix = '';
                    await (data.guild as GuildDB).save();
                    return msg.channel.send('The prefix have been reset to default');
                }

                if (args[1].length <= 0) return msg.channel.send('Your prefix is t0o short');
                else if (args[1].length >= 5) return msg.channel.send('Your prefix is too long');

                (data.guild as GuildDB).prefix = args[1];
                await (data.guild as GuildDB).save();

                return msg.channel.send(`The prefix have been set to \`${data.guild?.prefix}\``);
            }

            case 'avatar': {
                if (msg.author.id !== '851101363421315082') {
                    embed
                    .setTitle('Permission denied')
                    .setDescription('This settings is reserved for the owner only');
        
                    const message = await msg.channel.send(embed);
                    return setTimeout(() => message.delete(), 3000);
                }

                if (!args[1]) return msg.channel.send('You must provide an URL for the new avatar');
                await client.user?.setAvatar(args[1]);

                return msg.channel.send('Done!');
            }

            case 'username': {
                if (msg.author.id !== '851101363421315082') {
                    embed
                    .setTitle('Permission denied')
                    .setDescription('This settings is reserved for the owner only');
        
                    const message = await msg.channel.send(embed);
                    return setTimeout(() => message.delete(), 3000);
                }

                if (!args[1]) return msg.channel.send('You must provide a new username');
                await client.user?.setUsername(args[1]);

                return msg.channel.send('Done!');
            }
        }
    }
}