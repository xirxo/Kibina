import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'ping',
    async execute({ embed, client, msg }) {
        const message = await msg.channel.send('Pinging...');

        embed
            .setTitle('Pong!')
            .addField('Server Latency', `\`${message.createdTimestamp - msg.createdTimestamp}ms\``)
            .addField('API Latency', `\`${Math.round(client.ws.ping)}ms\``);

        message.edit(embed);
    }
}