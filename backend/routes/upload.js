import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controller/uploadController.js';

const router = express.Router();

// Memory storage 
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/upload
router.post('/', upload.single('file'), uploadFile);

export default router;
