import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import { nuevoEnlace, obtenerEnlace } from '../controllers/enlacesController.js';
import { eliminarArchivo } from '../controllers/archivosController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/',[
    check('nombre', 'Sube un archivo').notEmpty(),
    check('nombre_original', 'Sube un archivo').notEmpty()
], authMiddleware, nuevoEnlace);

router.get('/:url', obtenerEnlace, eliminarArchivo)

export default router;
