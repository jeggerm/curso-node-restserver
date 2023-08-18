const { request, response } = require('express'); 
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        }) 
    }

    try{

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        // leer usuario que corresponde al uid 
         const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Usuario no existe en BD'
            })
        }

         // Validar usuario tiene estado true
         if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token inválido - usuario estado false'
            });
         }


        req.usuario = usuario;
        //console.log(payload);

        next();

    }catch (error){

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }

}

module.exports = {
    validarJWT
}