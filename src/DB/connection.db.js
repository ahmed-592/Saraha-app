import mongoose from 'mongoose';
import { DB_URI } from '../../config/config.service.js';
import { userModel } from './model/user.model.js';

export const connectionDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        await userModel.syncIndexes();
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB faild to connected");
        console.log(error);

    }
}