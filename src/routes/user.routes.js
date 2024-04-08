import { Router } from 'express';
import { createEmployee, createUser, forgotMyPasswordSendEmail, login, updateUSerPasswordToken, updateUserPassword } from '../controllers/user.controller.js';
import { Roles, authorize } from '../configs/auth.cjs';

const router = Router();

router.post('', createUser);
router.post('/employee', authorize(Roles.ADMINISTRATOR), createEmployee);
router.post('/login', login);
router.post('/forgotMyPassword', forgotMyPasswordSendEmail);

router.put('/updatePassword', authorize(Roles.ALL), updateUserPassword);
router.put('/updatePasswordToken', updateUSerPasswordToken);

export default router;

