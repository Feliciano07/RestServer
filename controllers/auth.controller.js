const{request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async (req = request, res = response) =>{

    const {correo, password} = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Correo/password no son correctos - Correo'
            });
        }

        // Verificar si usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Correo/password no son correcto - estado=false'
            });
        }

        // Verificar contrasenia
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if(!validarPass){
            return res.status(400).json({
                msg: 'Correo/password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}