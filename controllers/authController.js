import Usuario from '../models/Usuario.js';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const autenticarUsuario = async (req, res, next) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Buscar el usuario
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(401).json({ msg: 'El usuario no existe' });
    return next();
  }

  if (compareSync(password, usuario.password)) {
    //Crear token
    const token = jwt.sign(
      {
        nombre: usuario.nombre,
        id: usuario._id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({ msg: 'Autenticación correcta', token });
  } else {
    res.status(401).json({ msg: 'Password incorrecto' });
    return next();
  }
};

const usuarioAutenticado = async (req, res, next) => {
  //req: trae los datos del usuario autenticado en el middleware
  res.json({ usuario: req.usuario });
};

export { autenticarUsuario, usuarioAutenticado };
