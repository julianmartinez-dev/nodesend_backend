import express from "express";
const router = express.Router();

import { nuevoUsuario } from "../controllers/usuarioController.js";

router.post("/", nuevoUsuario);

export default router;