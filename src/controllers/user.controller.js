import { Roles } from "../configs/auth.cjs";
import { forgotPassword } from "../services/emailService.js";
import { loginUser, newUser, updatePassword, updatePasswordToken } from "../services/userService.js";

export const login = async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password
        }

        const token = await loginUser(userData);
        if (token) {
            return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Bad Credentials' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const createUser = async (req, res) => {
    try {
        const newUserData = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: new Date(req.body.birthDate),
            role: "USER",
            email: req.body.email,
            phone: req.body.phone
        }

        const userSaved = await newUser(newUserData);
        if (userSaved) {
            return res.status(201).json(userSaved);        
        }
        return res.status(400).json({ message: 'User already exists' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const createEmployee = async (req, res) => {
    try {
        const newUserData = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: new Date(req.body.birthDate),
            role: req.body.role,
            email: req.body.email,
            phone: req.body.phone
        }

        const userSaved = await newUser(newUserData);
        if (userSaved) {
            return res.status(201).json(userSaved);        
        }
        return res.status(400).json({ message: 'User already exists' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const forgotMyPasswordSendEmail = async (req, res) => {
    console.log(req.data);
    try {

        const mail = await forgotPassword.sendMail(req, res);

        return res.status(200).json({ message: 'Email was sent' });

    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const updateUserPassword = async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword
        }

        const userUpdated = await updatePassword(userData);

        if (userUpdated) {
            return res.status(201).json(userUpdated);
        }
        return res.status(400).json({ message: 'Old password not match' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }

}

export const updateUSerPasswordToken = async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            newPassword: req.body.newPassword,
            token: req.body.token
        }

        const userUpdated = await updatePasswordToken(userData);

        if (userUpdated) {
            return res.status(201).json(userUpdated)
        }
        return res.status(400).json({ message: 'Error updating password' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
