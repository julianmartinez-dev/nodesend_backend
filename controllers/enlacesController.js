import Enlaces from '../models/Enlace.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

const nuevoEnlace = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //Craer el nuevo enlace
  const { nombre_original } = req.body;
  const enlace = new Enlaces();
  enlace.url = nanoid(12);
  enlace.nombre = nanoid(12);
  enlace.nombre_original = nombre_original;

  //Si el usuario esta autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    //Asignar a enlace el nuevo de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }
    //Asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    //Asignar el autor
    enlace.autor = req.usuario.id;
  }

  //Almacenar en la base de datos
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

//Obtener el enlace
const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  //Verificar si existe el enlace
  const enlace = await Enlaces.findOne({ url });

  //Si no existe el enlace
  if (!enlace) {
    res.status(404).json({ msg: 'Enlace no encontrado' });
    return next();
  }

  res.json({ archivo: enlace.nombre });

  if (enlace.descargas === 1) {
 
    req.archivo = enlace.nombre;
    await Enlaces.findOneAndRemove({ url });
    next(); //Ir al siguiente middleware (eliminarArchivo)
  } else {
    enlace.descargas--;
    await enlace.save();
  }
};

export { nuevoEnlace, obtenerEnlace };
