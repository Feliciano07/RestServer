
const {Router} = require('express');
const {check} = require('express-validator');

const { ValidarJWT, ValidarCampos, esAdminRole } = require('../middlewares');

const router = Router();


const { crearProducto, 
    obtenerProductos, 
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos.controller');

const { existeCategoria, 
    existeProducto 
} = require('../helpers/db-validators');


// Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    ValidarCampos,
    check('id').custom(existeProducto),
    ValidarCampos
], obtenerProducto);

// Crear un producto - privado - con token valido

router.post('/',[
    ValidarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    ValidarCampos
], crearProducto)


// Actualizar - privado - token valido
router.put('/:id',[
    ValidarJWT,
    check('id').custom(existeProducto),
    ValidarCampos
], actualizarProducto);


// Eliminar - privado - token valido- Admin
router.delete('/:id',[
    ValidarJWT,
    esAdminRole,
    check('id').custom(existeProducto),
    ValidarCampos
], borrarProducto);

module.exports = router;