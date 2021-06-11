import mongoose from 'mongoose';

const guildSchema = new mongoose.Schema({
    id: { type: String },
    prefix: { type: String }
});

export const guild = mongoose.model('Guild', guildSchema);