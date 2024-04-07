import { Router } from 'express';
import { createUser, forgotMyPasswordSendEmail, login } from '../controllers/user.controller.js';
import { Roles, authorize } from '../configs/auth.cjs';
import { updatePassword } from '../services/userService.js';

const router = Router();

router.post('', createUser);
router.post('/login', login);
router.post('/forgotMyPassword', authorize(Roles.ALL), forgotMyPasswordSendEmail);

router.put('/updatePassword', authorize(Roles.ALL), updatePassword);

export default router;

