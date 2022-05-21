import multer from 'multer';
import { nanoid } from 'nanoid';



const subirArchivo = async (req, res, next) => {

    //Configuracion para subir Archivo
    const configuracionMulter = {
      limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
          cb(null, `${nanoid(10)}${extension}`);
        },
      }),
    };
    const upload = multer(configuracionMulter).single('archivo');

    //Funcion  para subir archivo
  upload(req, res, async (error) => {;
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

const eliminarArchivo = async (req, res) => {};

export { subirArchivo, eliminarArchivo };
