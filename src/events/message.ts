import { ClientUser, Message } from 'discord.js';
import { Event } from '../../typings/index.js';
import { settings } from '../env.js';
import { Client } from '../extends/Client.js';
import { embed } from '../tools/embed.js';
import { logger } from '../tools/logger.js';

export const event: Event = {
    name: 'message',
    emitter: 'on',
    emit: async (message: Message, client: Client) => {
        const msgEmbed = embed(message.author, client.user as ClientUser);

        if (message.author.bot)
            return;

        if (!message.content.startsWith(settings.prefix)) {
            if (message.content === `<@${client.user?.id}>` || message.content === `<@!${client.user?.id}>`) {
                msgEmbed
                    .setTitle('Hello?')
                    .setDescription(`Did you just pinged me? Anyways... My prefix for this server is \`${settings.prefix}\``);

                return message.channel.send(msgEmbed);
            }

            else
                return;
        }

        const args = message.content.slice(settings.prefix.length).split(/ +/);
        const command = args.shift()?.toLowerCase();
        const cmd = client.commands.get(command as string);

        if (!cmd) return;
        else {
            if (cmd.scope === 'dm' && message.guild) {
                msgEmbed
                    .setTitle('Error')
                    .setDescription('This command can only be run in DMs');

                
                return message.channel.send(msgEmbed);
            }
            
            else if (cmd.scope === 'guild' && !message.guild) {
                msgEmbed
                    .setTitle('Error')
                    .setDescription('This command can only be run in servers');

                return message.channel.send(msgEmbed);
            }
            
            else {
                try {
                    cmd?.execute({ client: client, msg: message, args: args, embed: msgEmbed });
                } catch (err) {
                    logger('error', err.message);
                    msgEmbed
                        .setTitle('Error')
                        .setDescription('There was an error while executing that command')
                        .addField('Error Message', err.message)
    
                    return message.channel.send(msgEmbed);
                }
            }
        }
    }
}