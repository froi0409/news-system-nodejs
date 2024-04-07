import { Router } from 'express';
import { createNew, deleteById, getAllByCategory, getAllNews, getById } from '../controllers/new.controller.js';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('', upload.single('image'),createNew);

router.get('/getAll', getAllNews);
router.get('/getByCategory/:category', getAllByCategory);
router.get('/getById/:id', getById);

router.delete('/:id', deleteById);

export default router;
