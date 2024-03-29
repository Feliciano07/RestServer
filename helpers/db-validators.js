
const Role = require('../models/rol');
const Usuario = require('../models/usuario');
const {Categoria, Producto} = require('../models')


const esRolValido = async(rol = '') => {
    if(rol === '') return 0;
    const exitesRol = await Role.findOne({rol});
    if(!exitesRol){
        throw new Error(`el rol ${rol} no esta registrado`);
    }
}

const emailExiste = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya fue registrado`);
    }
}


const ExisteUsuarioId = async (id) =>{
    const existeId = await Usuario.findById(id);
    if(!existeId){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoria = async (id) =>{
    const existeId = await Categoria.findById(id);
    if(!existeId){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProducto = async (id) =>{
    const existeId = await Producto.findById(id);
    if(!existeId){
        throw new Error(`El id no existe ${id}`);
    }
}


const coleccionePermitidas = async (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida) throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)

    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    ExisteUsuarioId,
    existeCategoria,
    existeProducto,
    coleccionePermitidas
}