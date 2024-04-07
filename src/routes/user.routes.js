import { Router } from 'express';
import { createUser, forgotMyPasswordSendEmail, login, updateUserPassword } from '../controllers/user.controller.js';
import { Roles, authorize } from '../configs/auth.cjs';

const router = Router();

router.post('', createUser);
router.post('/login', login);
router.post('/forgotMyPassword', authorize(Roles.ALL), forgotMyPasswordSendEmail);

router.put('/updatePassword', authorize(Roles.ALL), updateUserPassword);

export default router;

