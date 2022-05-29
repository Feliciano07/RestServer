const {Router} = require('express');
const { check } = require('express-validator');
const { actualizarImagen, cargarArchivo } = require('../controllers/uploads.controller');
const { coleccionePermitidas } = require('../helpers');
const { ValidarCampos } = require('../middlewares');


const router = Router();


router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionePermitidas(c, ['usuarios', 'productos'])),
    ValidarCampos
], actualizarImagen)



module.exports =  router;