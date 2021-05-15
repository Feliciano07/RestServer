
const bcryptjs = require('bcryptjs');
const {response, request} = require('express');



const Usuario = require('../models/usuario');


const usuariosGet  = async(req= request, res=response) =>{
    //const query = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

/*     const usuarios = await Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde));
    
    const total = await Usuario.countDocuments(query); */

    // Ejecuta de forma simultanea
    const [total,usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ])
    
    res.json({
        total,
        usuario
    });
}

const usuariosPost =  async (req = request, res= response) =>{

    

    const {nombre, password, correo, rol} = req.body;
    const usuario = new Usuario({nombre, password, correo, rol});

    
    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req=request, res= response) =>{

    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;
    
    //TODO: validar el id

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}


const usuariosPatch = (req = request, res = response) =>{
    res.json({
        msg: 'Patch Api'
    });
}

const usuariosDelete = async (req = request, res = response) =>{

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosDelete
}


