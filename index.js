import express from 'express';
import conectarDB from './config/db.js';
import usuariosRoutes from './routes/usuarios.js';
import authRoutes from './routes/auth.js';
import enlacesRoutes from './routes/enlaces.js'
import archivosRoutes from './routes/archivos.js'


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
app.use('/api/auth', authRoutes);
app.use('/api/enlaces', enlacesRoutes)
app.use('/api/archivos', archivosRoutes)

//Arrancar el servidor
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
})