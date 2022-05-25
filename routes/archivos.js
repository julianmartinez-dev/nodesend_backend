import express from 'express';
const router = express.Router();
import { subirArchivo, eliminarArchivo, descargarArchivo } from '../controllers/archivosController.js';
import authMiddleware from '../middleware/auth.js';


router.post('/',authMiddleware, subirArchivo)
router.get('/:archivo', descargarArchivo, eliminarArchivo)

export default router;