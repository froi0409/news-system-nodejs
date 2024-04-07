import UserModel from '../models/User.js'
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();

export const newUser = async (userData) => {
    try {
        if (await findUserByUsername(userData.username)) {
            return null;
        }
        
        // encrypting the password
        userData.password = await hashPassword(userData.password);

        const newUser = new UserModel(userData);

        const userSaved = await newUser.save();
        return userSaved;
    } catch (error) {
        throw error;
    }

}

export const loginUser = async (userData) => {
    try {
        const user = await findUserByUsername(userData.username);
        
        if (user && await comparePasswords(userData.password, user.password)) {
            const token = generateToken(user);
            return token;
        }
        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findUserByUsername = async (username) => {
    try {
        const user = await UserModel.findOne({
            username: username
        });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePassword = async (userData) => {
    try {
        let user = await UserModel.findOne({ username: userData });
        
        if (user && await comparePasswords(userData.oldPassword, user.password)) {
            const hashedPassword = await hashPassword(userData.newPassword);
            
            user = await UserModel.updateOne({ username: userData.username }, { $set: { password: hashedPassword } });
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const updatePasswordToken = async (userData) => {
    try {
        let user = await UserModel.findOne({ username: userData.username });

        if (user && user.tokenResetPassword && user.tokenResetPassword === userData.token) {
            const hashedPassword = await hashPassword(userData.newPassword);

            const userUpdated = await UserModel.updateOne({ username: userData.username }, { $set: { password: hashedPassword } });
            return userUpdated;
        }
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

const comparePasswords = async (password1, password2) => {
    try {
        return await bcrypt.compare(password1, password2);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const generateToken  = (userData) => {
    // all the information from the token
    const payload = {
        user: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role
    };
    // Generate a JWT with expiration time
    const token = jwt.sign(payload, process.env.SECRET,{ expiresIn: '1h' });

    return token;
}
