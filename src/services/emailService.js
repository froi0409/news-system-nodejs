import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'

export const forgotPassword = {
    async sendMail (req, res) {
        if (req.body.username.trim() === '""') {
            res.status(400).json({
                message: 'email requerido'
            })
        }

        try {
            const user = await UserModel.findOne({
                username: req.body.username
            })

            if (!user) {
                return res.status(404).json({ message: 'User Not Found' });
            }

            const token = jwt.sign({ id: user.username }, process.env.SECRET, { expiresIn: '1h' } );
            
            const userToUpdate = await UserModel.updateOne({ username: req.body.username }, { $set: { tokenResetPassword: token } });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            });

            const mailOptions = {
                from: `${process.env.EMAIL_ADDRESS}`,
                to: user.email,
                subject: 'Restablecer Contraseña',
                text: `A continuación te brindamos tu enlace para reestablecer contraseña (recuerda no compartirlo):    ${process.env.EMAIL_PORT}/resetPassword/${user.username}/${token}`
            };

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error(`Error sendind email: ${err}`);
                } else {
                    res.status(200).json('Email password reset has been sent')
                }
            });

        } catch (error) {
            throw error;
        }

    }
}

export default forgotPassword;
