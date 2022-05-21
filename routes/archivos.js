import express from 'express';
const router = express.Router();
import { subirArchivo, eliminarArchivo } from '../controllers/archivosController.js';
import authMiddleware from '../middleware/auth.js';


router.post('/',authMiddleware, subirArchivo)


export default router;