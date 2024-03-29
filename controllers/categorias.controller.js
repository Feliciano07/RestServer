const {request, response} = require('express')
const {Categoria} = require('../models');



const crearCategoria = async(req= request, res = response)=>{

    const nombre = req.body.nombre.toUpperCase(); // parser a mayuscula, para validar que no existan repetidas

    // consultamos si existe una categoria con el nombre ya
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // Crear un new categoria
    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();
    
    res.status(201).json(categoria);

}

// obtenerCategorias - paginado - total - populate

const obtenerCategorias = async (req= request, res = response) =>{
    const {limite = 5, desde = 0} = req.query; //paginado
    const query = {estado: true}; // que no fue borrado

    //ejecutar consulta
    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario','nombre')
    ]);

    res.json({
        total,
        categoria
    })

}


// obtenerCategoria - populate {}
const obtenerCategoria = async (req= request, res = response) =>{

    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    })

}



// actualizarCategoria - nombre
const actualizarCategoria = async(req= request, res = response)=>{
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

   

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json({
        categoria
    })
}



// borrarCategoria - estado:false
const borrarCategoria = async(req= request, res= response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json({
        categoria
    })
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}