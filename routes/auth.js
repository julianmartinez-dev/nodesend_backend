import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import { autenticarUsuario, usuarioAutenticado } from '../controllers/authController.js'
import authMiddleware from '../middleware/auth.js';

router.post('/',[
    check('email', 'Debes ingresar un mail válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty()
], autenticarUsuario)


router.get('/',authMiddleware, usuarioAutenticado)



export default router;