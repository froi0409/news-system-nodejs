import { newUser } from "../services/userService.js";

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
        return res.status(201).json(userSaved);        
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
