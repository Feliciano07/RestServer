
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const ValidarJWT = async(req=request, res= response, next) =>{

    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        })
    }

    try {

        //Aca mando la llave secretOrPrivateKey
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Obtener el usuario autenticado
        const usuario = await Usuario.findById(uid);

        // Si no encuentra usuario
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido, usuario no existe DB'
            })
        }

        // Validar si el usuario no fue borrado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido, usuario con estado = false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}



module.exports = {
    ValidarJWT
}

