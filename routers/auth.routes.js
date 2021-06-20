const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
login, googleSingin
} = require('../controllers/auth.controller');
const { ValidarCampos } = require('../middlewares/validar-campos');


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    ValidarCampos
], login );

router.post('/google',[
    check('id_token', 'El id token es necesario').not().isEmpty(),
    ValidarCampos
], googleSingin );



module.exports = router;