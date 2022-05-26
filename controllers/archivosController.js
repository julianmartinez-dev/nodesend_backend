import multer from 'multer';
import { nanoid } from 'nanoid';
import * as fs from 'fs';
import Enlaces from '../models/Enlace.js';

const subirArchivo = async (req, res, next) => {
  //Configuracion para subir Archivo
  const configuracionMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 20 : 1024 * 1024 },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length
        );
        cb(null, `${nanoid(10)}${extension}`);
      },
    }),
  };
  const upload = multer(configuracionMulter).single('archivo');

  //Funcion  para subir archivo
  upload(req, res, async (error) => {
    if (!error) {
      res.json({
        archivo: req.file.filename,
      });
    } else {
      console.log(error);
      return next();
    }
  });
};

const eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(`uploads/${req.archivo}`);
    console.log('Archivo eliminado');
  } catch (error) {
    console.log(error);
  }
};

const descargarArchivo = async (req, res, next) => {
  try {
    const enlace = await Enlaces.findOne({ nombre: req.params.archivo });

    console.log(enlace);

    const archivo = `uploads/${req.params.archivo}`;
    res.download(archivo);

    const { descargas, nombre } = enlace;

    if (descargas === 1) {
      req.archivo = nombre;
      await Enlaces.findOneAndRemove(enlace.id);
      next();
    } else {
      enlace.descargas--;
      await enlace.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export { subirArchivo, eliminarArchivo, descargarArchivo };
