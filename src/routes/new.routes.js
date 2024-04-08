import { Router } from 'express';
import { createNew, deleteById, deleteReportedById, getAllByCategory, getAllDeletedNews, getAllNews, getById } from '../controllers/new.controller.js';
import multer from 'multer';
import { authorize, Roles } from '../configs/auth.cjs';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('', authorize(Roles.ALL), upload.single('image'),createNew);

router.get('/getAll', authorize(Roles.ALL), getAllNews);
router.get('/getByCategory/:category/:id', authorize(Roles.ALL), getAllByCategory);
router.get('/getById/:id', authorize(Roles.ALL), getById);
router.get('/getAllDeleted', authorize(Roles.ADMINISTRATOR), getAllDeletedNews);

router.delete('/:id', authorize(Roles.ALL), deleteById);
router.delete('/deleteByReport/:id/:report', authorize(Roles.ADMINISTRATOR), deleteReportedById);

export default router;
