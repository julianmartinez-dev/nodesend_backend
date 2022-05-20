import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()

const conectarDB = async () => {
    try {
        const conexion = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const url = `${conexion.connection.host}:${conexion.connection.port}`;
        console.log('MongoDB conectada: ', url);
    } catch (error) {
        console.log('Hubo un error', error);
        process.exit(1)
    }
}

export default conectarDB;