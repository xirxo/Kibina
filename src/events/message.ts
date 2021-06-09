import { ClientUser, Message, TextChannel } from 'discord.js';
import { Command, Event } from '../../typings/index.js';
import { settings } from '../env.js';
import { Client } from '../extends/Client.js';
import { embed as embedFunc } from '../tools/embed.js';
import { logger } from '../tools/logger.js';

export const event: Event = {
    name: 'message',
    emitter: 'on',
    async emit (message: Message, client: Client) {
        const embed = embedFunc(message.author, client.user as ClientUser);

        if (message.author.bot) return;

        if (!message.content.startsWith(settings.prefix)) {
            if (message.content === `<@${client.user?.id}>` || message.content === `<@!${client.user?.id}>`) {
                embed
                    .setTitle('Hello?')
                    .setDescription(`Did you just pinged me? Anyways... My prefix for this server is \`${settings.prefix}\``);

                return message.channel.send(embed);
            }

            else
                return;
        }

        const args = message.content.slice(settings.prefix.length).split(/ +/);
        const command = args.shift()?.toLowerCase();
        const cmd = ((client as Client).commands.get(command as string) || client.commands.find((cmd: Command) => cmd.aliases && cmd.aliases.includes(command as string)))

        if (!cmd) return;
        if (cmd.owner && message.author.id !== '851101363421315082') {
            embed
            .setTitle('Permission denied')
            .setDescription('This command is reserved for the owner only');

            const msg = await message.channel.send(embed);
            setTimeout(msg.delete, 3000);
        }

        else if (cmd.nsfw) {
            if (message.guild && !(message.channel as TextChannel).nsfw) {
                embed
                .setTitle('Permission denied')
                .setDescription('This command can only be used in NSFW marked channel or in my DMs')

                const msg = await message.channel.send(embed);
                setTimeout(msg.delete, 3000);
            }
        }

        else if (cmd.scope === 'guild' && !message.guild) {
            embed
            .setTitle('Permission denied')
            .setDescription('This command can only be used in a server');

            const msg = await message.channel.send(embed);
            setTimeout(msg.delete, 3000);
        }

        else if (cmd.scope === 'dm' && message.guild) {
            embed
            .setTitle('Permission denied')
            .setDescription('This command can only be used in my DMs');

            const msg = await message.channel.send(embed);
            setTimeout(msg.delete, 3000);
        }

        try {
            (cmd as Command).execute({ args: args, client: client, embed: embed, msg: message });
        } catch (err) {
            logger('error', err.message);

            embed
            .setTitle('Error')
            .setDescription('There was an error while executing that command')
            .addField('Error message', `\`\`\`\n${err.message}\n\`\`\``);

            const msg = await message.channel.send(embed);
            setTimeout(msg.delete, 3000);
        }
    }
}