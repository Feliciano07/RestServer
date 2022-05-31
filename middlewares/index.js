const ValidarCampos = require('../middlewares/validar-campos');
const ValidarJWT  = require('../middlewares/validar-jwt');
const ValidarRoles = require('../middlewares/validar-roles');
const validarArchivoSubir  = require('./validar-archivo');

module.exports = {
    ...ValidarCampos,
    ... ValidarJWT,
    ... ValidarRoles,
    ... validarArchivoSubir
}