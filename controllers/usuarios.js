
const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const {q, nombre = 'No Name', page = 1, limit, apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    
    const { nombre, edad } = req.body; 
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    
    const { id }  = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'patch API - controlador'
    });
}


module.exports = { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch 
}