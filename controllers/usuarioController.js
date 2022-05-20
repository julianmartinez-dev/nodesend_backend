import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

const nuevoUsuario = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email, password } = req.body;

  //Revisar si el usuario existe
  const usuarioExiste = await Usuario.findOne({ email: email });
  if (usuarioExiste) {
    res.status(400).json({ msg: 'El usuario ya existe' });
    return;
  }

  //Crear el nuevo usuario
  const usuario = await new Usuario(req.body);
  //Encriptar el password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  //Guardar el usuario
  try {
    await usuario.save();
    res.status(200).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

export { nuevoUsuario };
