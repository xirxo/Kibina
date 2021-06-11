import { ClientUser, Collection, Message, TextChannel } from 'discord.js';
import { Command, DataObject, Event, GuildDB, UserDB } from '../../typings/index.js';
import { settings } from '../env.js';
import { Client } from '../extends/Client.js';
import { embed as embedFunc } from '../tools/embed.js';
import { logger } from '../tools/logger.js';
import { time } from '../tools/time.js';

export const event: Event = {
    name: 'message',
    emitter: 'on',
    async emit (message: Message, client: Client) {
        let prefix: string;
        const cooldown: Collection<string, Collection<string, any>> = new Collection();
        const data: DataObject = {
            user: await client.data?.getUser(message.author.id) as UserDB,
            guild: null,
        };

        if (message.guild) {
            data.guild = await client.data?.getGuild(message.guild.id) as GuildDB;
            prefix = data.guild!.prefix?.length ? data.guild!.prefix : settings.prefix
        } else {
            prefix = settings.prefix;
        }

        const embed = embedFunc(message.author, client.user as ClientUser);

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) {
            if (message.content === `<@${client.user?.id}>` || message.content === `<@!${client.user?.id}>`) {
                embed
                .setTitle('Hello?')
                .setDescription(`Did you just pinged me? Anyways... My prefix ${message.guild ? 'for this server ' : ''}is \`${prefix}\``);

                return message.channel.send(embed);
            }

            else {
                return;
            }
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift()?.toLowerCase();
        const cmd = ((client as Client).commands.get(command as string) || client.commands.find((cmd: Command) => cmd.aliases && cmd.aliases.includes(command as string)))

        if (!cmd) return;
        if (cmd.owner && message.author.id !== '851101363421315082') {
            embed
            .setTitle('Permission denied')
            .setDescription('This command is reserved for the owner only');

            const msg = await message.channel.send(embed);
            return setTimeout(() => msg.delete(), 3000);
        }

        else if (cmd.nsfw) {
            if (message.guild && !(message.channel as TextChannel).nsfw) {
                embed
                .setTitle('Permission denied')
                .setDescription('This command can only be used in NSFW marked channel or in my DMs')

                const msg = await message.channel.send(embed);
                return setTimeout(() => msg.delete(), 3000);
            }
        }

        else if (cmd.scope === 'guild' && !message.guild) {
            embed
            .setTitle('Permission denied')
            .setDescription('This command can only be used in a server');

            const msg = await message.channel.send(embed);
            return setTimeout(() => msg.delete(), 3000);
        }

        else if (cmd.scope === 'dm' && message.guild) {
            embed
            .setTitle('Permission denied')
            .setDescription('This command can only be used in my DMs');

            const msg = await message.channel.send(embed);
            return setTimeout(() => msg.delete(), 3000);
        }

        if (!cooldown.has(cmd.name)) {
            cooldown.set(cmd.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldown.get(cmd.name);
        const amt = (cmd.cooldown || 3) * 1000;

        if ((timestamps as Collection<string, any>).has(message.author.id)) {
            const exprTime = (timestamps as Collection<string, any>).get(message.author.id) + amt;

            if (now < exprTime) {
                return message.channel.send(`Woah! Slow down. You're going too fast. Please wait anothor ${time(exprTime - now)} before running that again`);
            }

            if (message.author.id !== '851101363421315082') {
                (timestamps as Collection<string, any>).set(message.author.id, now);
                setTimeout(() => (timestamps as Collection<string, any>).delete(message.author.id), amt);
            }
        }

        try {
            (cmd as Command).execute({ args: args, client: client, embed: embed, msg: message, data: data });
        } catch (err) {
            logger('error', err.message);

            embed
            .setTitle('Error')
            .setDescription('There was an error while executing that command')
            .addField('Error message', `\`\`\`\n${err.message}\n\`\`\``);

            const msg = await message.channel.send(embed);
            return setTimeout(() => msg.delete(), 3000);
        }
    }
}