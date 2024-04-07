import UserModel from '../models/User.js'
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

export const newUser = async (userData) => {
    try {
        // encrypting the password
        userData.password = await hashPassword(userData.password);

        const newUser = new UserModel(userData);

        const userSaved = await newUser.save();
        return userSaved;
    } catch (error) {
        throw error;
    }

}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALTS));
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
