import { GuildMember, User } from 'discord.js';
import { Command } from '../../../typings/index';
import { time } from '../../tools/time.js'

export const command: Command = {
    name: 'user',
    category: 'General',
    aliases: ['userinfo', 'ui'],
    desc: 'Get information on a specific user',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,

    async execute({ client, embed, args, msg }) {
        let user: User | undefined = undefined;
        let member: GuildMember | undefined = undefined;

        if (args[0] && Array.from(msg.mentions.members!.keys() ?? msg.mentions.users.keys()).length) user = await client.users.fetch((msg.mentions.users.first() as User).id);
        else if (args[0] && !Array.from(msg.mentions.members!.keys() ?? msg.mentions.users.keys()).length) user = await client.users.fetch(args[0]);
        else user = await client.users.fetch(msg.author.id);

        if (msg.guild) member = await msg.guild.members.fetch(user);

        if (user.id === client.user!.id) {
            (await import('./info.js')).command.execute({ msg: msg, client: client, args: args, embed: embed });
            return;
        }

        embed
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField('ID', user.id)
        .addField('Created at', time(user.createdTimestamp));

        if (member) embed.addField('Joined at', time(member.joinedTimestamp as number));

        return msg.channel.send(embed);
    }
}