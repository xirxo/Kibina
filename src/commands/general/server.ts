import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'server',
    scope: 'guild',
    execute: ({ embed, msg }) => {
        const server = msg.guild;
        let role = server?.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(',');

        if (!role) role = 'No role to display';
        if (role.length > 200) role = 'To many roles to display'

        embed
            .setTitle(`Information about ${server?.name}`)
            .addField('Name', server?.name, true)
            .addField('ID', `\`${server?.id}\``, true)
            .addField('Owner', server?.owner, true)
            .addField('Owner\'s ID', `\`${server?.ownerID}\``, true)
            .addField('Member count', server?.memberCount, true)
            .addField('Roles', role, true)
            
        server?.iconURL({ dynamic: true }) ? embed.setThumbnail(server?.iconURL({ dynamic: true }) as string).addField('Icon', `[Click here](${server?.iconURL({ dynamic: true })} '${server?.name}'s Icon')`) : null;

        msg.channel.send(embed);
    }
}