import { Router } from 'express';
import { createUser, forgotMyPasswordSendEmail, login, updateUserPassword } from '../controllers/user.controller.js';
import { Roles, authorize } from '../configs/auth.cjs';
import { updatePasswordToken } from '../services/userService.js';

const router = Router();

router.post('', createUser);
router.post('/login', login);
router.post('/forgotMyPassword', forgotMyPasswordSendEmail);

router.put('/updatePassword', authorize(Roles.ALL), updateUserPassword);
router.put('/updatePasswordToken', updatePasswordToken);

export default router;

