import { Router } from 'express';
import { createNew } from '../controllers/new.controller.js';

const router = Router();

router.post('', createNew);

export default router;

