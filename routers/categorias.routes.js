const {Router} = require('express');
const {check} = require('express-validator');
const { ValidarJWT, ValidarCampos, esAdminRole } = require('../middlewares');

const router = Router();

const {
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria
} = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// crear middleware existeCategoria

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    ValidarCampos
], obtenerCategoria);

//Crear una categoria - privado - con token valido
router.post('/',[
    ValidarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ValidarCampos
], crearCategoria);

// Actualizar - privado - token valido
router.put('/:id',[
    ValidarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    ValidarCampos
], actualizarCategoria);

// Eliminar - privado - token valido- Admin
router.delete('/:id',[
    ValidarJWT,
    esAdminRole,
    check('id').custom(existeCategoria),
    ValidarCampos
], borrarCategoria);

module.exports = router;