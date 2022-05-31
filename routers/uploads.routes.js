const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImgen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionePermitidas } = require('../helpers');
const { ValidarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();


router.post('/', validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionePermitidas(c, ['usuarios', 'productos'])),
    ValidarCampos
], actualizarImagenCloudinary)


router.get('/:coleccion/:id',[

], mostrarImgen)


module.exports =  router;