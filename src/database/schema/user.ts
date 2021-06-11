import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String },
    inv: { type: Array, default: [] },
    money: { type: Number, default: 0 }
});

export const user = mongoose.model('User', userSchema);