import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'role',
    category: 'General',
    aliases: ['roles'],
    desc: 'Get a list of all roles in a server',
    cooldown: 0,
    scope: 'guild',
    nsfw: false,
    owner: false,
    guildOwner: false,
    
    async execute ({ msg, embed }) {
        const server = await msg.guild?.fetch();
        const role = server?.roles.cache
            .filter(r => !r.name.includes('everyone'))
            .sort((a, b) => b.position - a.position)
            .map(r => `<@&${r.id}>`).join(', ');

        embed
        .setTitle('Roles')
        .setDescription('Here\'s a list of roles from this server')
        .addField('Role count', `${server?.roles.cache.size} roles`, true)
        .addField('Role', role);

        return msg.channel.send(embed);
    }
}