
const {response, request} = require('express');


const usuariosGet  = (req= request, res=response) =>{

    const query = req.query;


    res.json({
        msg: 'Get Api',
        query
    });
}

const usuariosPost =  (req = request, res= response) =>{

    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post Api',
        nombre,
        edad
    });
}

const usuariosPut = (req=request, res= response) =>{

    const {id} = req.params;

    res.json({
        msg: 'Put Api',
        id
    });
}


const usuariosPatch = (req = request, res = response) =>{
    res.json({
        msg: 'Patch Api'
    });
}

const usuariosDelete = (req = request, res = response) =>{
    res.json({
        msg: 'Delete Api'
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


