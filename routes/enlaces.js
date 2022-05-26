import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import {
  nuevoEnlace,
  obtenerEnlace,
  todosEnlaces,
  tienePassword,
  verificarPassword,
} from '../controllers/enlacesController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/',[
    check('nombre', 'Sube un archivo').notEmpty(),
    check('nombre_original', 'Sube un archivo').notEmpty()
], authMiddleware, nuevoEnlace);

router.get('/', todosEnlaces);

router.get('/:url',tienePassword, obtenerEnlace)

router.post('/:url',verificarPassword, obtenerEnlace)

export default router;
