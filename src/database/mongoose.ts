import { user } from './schema/user.js';
import { guild } from './schema/guild.js';
import { logger } from '../tools/logger.js';

export async function getUser(id: string) {
    try {
        let userDB = await user.findOne({ id: id });
        if (userDB) return userDB;

        else {
            userDB = new user({
                id: id
            });

            await userDB.save();
            return userDB;
        }
    } catch (error) {
        logger('error', error.message);
    }
}

export async function getGuild(id: string) {
    try {
        let guildDB = await guild.findOne({ id: id });
        if (guildDB) return guildDB;

        else {
            guildDB = new guild({
                id: id
            });

            await guildDB.save();
            return guildDB;
        }
    } catch (error) {
        logger('error', error.message);
    }
}