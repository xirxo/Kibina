import { Command } from '../../../typings/index';
import { Client } from '../../extends/Client.js'

export const command: Command = {
    name: 'help',
    category: 'General',
    aliases: ['command', 'commands', 'cmd', 'cmds'],
    desc: 'Get a list of all commands',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,
    guildOwner: false,

    execute ({ embed, msg, args, client }) {
        const cmd: Command | null | undefined = args[0] ? ((client as Client).commands.get(args[0].toLowerCase()) || (client as Client).commands.find((cmd: Command) => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : null;

        if (cmd && cmd !== null) {
            embed
            .setTitle(`Help > ${cmd.name}`)
            .setDescription(cmd.desc)
            .addField('Name', `\`${cmd.name}\``)
            .addField('Aliases', cmd.aliases.length ? `\`${cmd.aliases.join('`, `')}\`` : 'None')
            .addField('Category', cmd.category)
            .addField('Cooldown', cmd.cooldown ? `${cmd.cooldown}s` : 'None')
            .addField('Scope', `\`${cmd.scope}\``)
            .addField('NSFW?', cmd.nsfw ? `\`true\`` : `\`false\``)
            .addField('Owner only?', cmd.owner ? `\`true\`` : `\`false\``)
            .addField('Guild owner only?', cmd.guildOwner ? `\`true\`` : `\`false\``)

            return msg.channel.send(embed);
        }

        const categories = (client as Client).commands.map(x => x.category).filter((i, p, s) => s.indexOf(i) === p);
        const commands: { name: string; value: string }[] = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const command = (client as Client).commands.filter(x => x.category === category).map(x => x.name);

            const _cmd = command.length ? command.join('`, `') : 'None';
            const _command = { name: category, value: _cmd };

            commands.push(_command);
        }

        embed.setTitle('Help');

        for (const cmd of commands) {
            embed.addField(cmd.name, `\`${cmd.value}\``);
        }

        return msg.channel.send(embed);
    }
}