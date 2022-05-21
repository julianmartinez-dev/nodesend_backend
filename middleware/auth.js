import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
   const authHeader = req.get('Authorization');

   if (authHeader) {
     //Obtener el token
     const token = authHeader.split(' ')[1];

     try {
       //Comprobar el jwtoken
       const usuario = jwt.verify(token, process.env.JWT_SECRET);
       //si el usuario esta autenticado lo enviamos al controlador
       req.usuario = usuario;
     } catch (error) {
       res.status(401).json({ msg: 'No autorizado' });
     }
   }

   return next();
}

export default authMiddleware;