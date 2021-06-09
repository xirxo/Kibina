import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'ping',
    category: 'General',
    aliases: ['latency'],
    desc: 'Get the bot latency',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,

    execute ({ client, msg }) {
        msg.channel.send('Pinging...').then(m => {
            const latency = Math.floor(m.createdTimestamp - msg.createdTimestamp);
            return m.edit(`Latency: \`${latency}ms\`\nAPI: \`${Math.floor(client.ws.ping)}ms\``);
        });
    }
}