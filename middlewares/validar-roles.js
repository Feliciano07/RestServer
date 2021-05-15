
const {request, response} = require('express');


const esAdminRole = (req= request, res = response, next) =>{

    if( !req.usuario){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador no puede eliminar`
        });
    }
    next();
}

const tieneRole = (...roles) =>{
    return (req, res, next) =>{
        if( !req.usuario){
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `el servicio requiere uno de los siguientes roles ${roles}`
            })
        }

        next();
    }

}



module.exports = {
    esAdminRole,
    tieneRole
}

