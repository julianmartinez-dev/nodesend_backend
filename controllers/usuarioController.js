import Usuario from "../models/Usuario.js";

const nuevoUsuario = async (req, res) => {

    const usuario = await new Usuario(req.body);

    res.json({msg: "Usuario creado correctamente"});
    usuario.save()
}

export {
    nuevoUsuario
}