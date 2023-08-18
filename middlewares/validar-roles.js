const { response } = require('express'); 

const esAdminRole = (req, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Validacion de Rol sin validacion de Token'
        })
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede realizar accion` 
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {
    return ( req, res = response, next ) => {
        console.log(roles, req.usuario.rol );

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Validacion de Rol sin validacion de Token'
            })
        }

        if( !roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles : ${ roles }`
            })
        }

        next();
    } 
}

module.exports = {
    esAdminRole,
    tieneRol
}