import express from 'express';
import conectarDB from './config/db.js';
import usuariosRoutes from './routes/usuarios.js';

//Crear servidor
const app = express();
//Habilitar leer los valores del body
app.use(express.json());

//Conectar a la base de datos
conectarDB();

//Puerto de la App
const port = process.env.PORT || 4000;

//Rutas de la app
app.use('/api/usuarios', usuariosRoutes);

//Arrancar el servidor
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
})