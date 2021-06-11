import { Command } from '../../../typings/index'
import fetch from 'node-fetch';

export const command: Command = {
    name: 'github',
    category: 'General',
    aliases: ['gh'],
    desc: 'Get information about a repo on GitHub',
    cooldown: 0,
    scope: 'any',
    nsfw: false,
    owner: false,
    guildOwner: false,

    async execute({ embed, msg, args }) {
        const user = !args[0] ? 'xirxo' : args[0];
        const repo = !args[1] ? 'Kibina' : args[1];

        const gh = await fetch(`https://api.github.com/repos/${user}/${repo}`);

        if (gh.status === 200) {
            const repoJSON = await gh.json();

            embed
            .setTitle(repoJSON.name)
            .setDescription(repoJSON.description)
            .setThumbnail(repoJSON.owner.avatar_url)
            .addField('Repo', `[Click here](${repoJSON.html_url})`)
            .addField('Statistics', `Stars: \`${repoJSON.stargazers_count}\`\nForks: \`${repoJSON.forks}\``);

            return msg.channel.send(embed)
        } else {
            return msg.channel.send(`Request returned a \`${gh.status}\``);
        }
    }
};