import { Command } from '../../../typings/index'
import { time, toHumanString } from '../../tools/time.js';

export const command: Command = {
    name: 'info',
    category: 'General',
    aliases: ['botinfo', 'bi', 'stats', 'botstats'],
    desc: 'Information about the bot',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,
    guildOwner: false,

    execute ({ embed, client, msg }) {
        const ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);

        embed
        .setTitle(client.user?.tag)
        .addField('ID', `\`${client.user?.id}\``)
        .addField('Created at', time(client.user?.createdTimestamp))
        .addField('RAM usage', `\`${ram} MiB\``)
        .addField('Guilds', `\`${client.guilds.cache.size}\``)
        .addField('Latency', `\`${Math.round(client.ws.ping)}ms\``)
        .addField('Uptime', toHumanString(client.uptime as number))
        .addField('Enviroment', `\`${process.env.NODE_ENV || 'development'}\``)
        .setThumbnail(client.user?.displayAvatarURL() as string);

        return msg.channel.send(embed);
    }
}