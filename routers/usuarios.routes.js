const {Router} = require('express');
const { check } = require('express-validator');

const {
    usuariosGet, 
    usuariosPost, 
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios.controller');

const { 
    esRolValido, 
    emailExiste,
    ExisteUsuarioId
} = require('../helpers/db-validators');

const {
    ValidarCampos,
    ValidarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( ExisteUsuarioId),
    check('rol').custom(esRolValido),
    ValidarCampos
] ,usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( correo => emailExiste(correo)),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROLE']),
    check('rol').custom( rol => esRolValido(rol)),
    ValidarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    ValidarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( ExisteUsuarioId),
    ValidarCampos
] ,usuariosDelete);



module.exports = router;


