const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
login
} = require('../controllers/auth.controller');
const { ValidarCampos } = require('../middlewares/validar-campos');


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    ValidarCampos
], login );



module.exports = router;