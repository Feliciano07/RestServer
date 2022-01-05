const {request, response} = require('express')
const {Producto} = require('../models');


const crearProducto = async(req= request, res = response) =>{

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    //Generar la data para guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto)
}

const obtenerProductos = async (req= request, res = response) =>{
    const {limite = 5, desde = 0} = req.query; //paginado
    const query = {estado: true}; // que no fue borrado

    //ejecutar consulta
    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario','nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        producto
    })

}

const obtenerProducto = async (req= request, res = response) =>{

    const {id} = req.params;

    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria','nombre');
    

    res.json({
        producto
    })

}

const actualizarProducto = async(req= request, res = response)=>{
    const {estado, usuario, ...data} = req.body;

    const {id} = req.params;

    // const productoDB = await Producto.findOne({ nombre: data.nombre.toUpperCase()});

    // if(productoDB){
    //     return res.status(400).json({
    //         msg: `El producto ${productoDB.nombre}, ya existe`
    //     });
    // }

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }


    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json({producto});

}


// borrarProducto - estado:false
const borrarProducto = async(req= request, res= response)=>{
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json({
        producto
    })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}