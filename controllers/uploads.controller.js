
const {request, response} = require('express');
const { subirArchivo } = require('../helpers');



const cargarArchivo = async (req = request, res = response) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }

    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs')
        res.json({nombre})    
    } catch (error) {
        res.status(400).json({msg: error})
    }

    

}

const actualizarImagen = async (req= request, res= response) => {
    const {id, coleccion} = req.params
    
    res.json({
        id,
        coleccion
    })
}


module.exports = {
    cargarArchivo ,
    actualizarImagen
}