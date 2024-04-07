import { loginUser, newUser } from "../services/userService.js";

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
