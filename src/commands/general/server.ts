import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'server',
    category: 'General',
    aliases: ['serverinfo', 'si'],
    desc: 'Information about the current server',
    cooldown: 0,
    scope: 'guild',
    nsfw: false,
    owner: false,
    guildOwner: false,
    
    async execute ({ embed, client, msg }) {
        const owner = await client.users.fetch(msg.guild?.ownerID as string);
        const server = await client.guilds.fetch(msg.guild?.id as string);
        
        let role;
        role = server.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(', ')

        if (role.length > 200) role = 'Too many roles to display';
        else if (!role.length) role = 'No role to display';

        embed
        .setTitle(server.name)
        .addField('Owner', `Tag: \`${owner.tag}\`\nID: \`${owner.id}\``)
        .addField('Members', `Total: \`${server.memberCount}\` members`)
        .addField('Roles', role)

        if (server.iconURL()) embed.setThumbnail(server.iconURL({ dynamic: true }) as string);

        return msg.channel.send(embed);
    }
}