const {Router} = require('express');
const {check} = require('express-validator');
const {ValidarCampos} = require('../middlewares/validar-campos');

const router = Router();


// Obtener todas las categorias - publico
router.get('/', (req, res) =>{
    res.json('get');
});

// Obtener una categoria por id - publico
router.get('/:id', (req, res) =>{
    res.json('get - id');
});

//Crear una categoria - privado - con token valido
router.post('/', (req, res) =>{
    res.json('post');
});

// Actualizar - privado - token valido
router.put('/:id', (req, res) =>{
    res.json('put');
});

// Eliminar - privado - token valido
router.delete('/:id', (req, res) =>{
    res.json('delete');
});

module.exports = router;