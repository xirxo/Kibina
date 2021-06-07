import { ClientUser, MessageEmbed, User } from 'discord.js';

export function embed(user: User, clientUser: ClientUser): MessageEmbed {
    return new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(clientUser.tag, clientUser.displayAvatarURL());
}