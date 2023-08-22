const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const router = Router();

router.get('/:coleccion/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios','productos'])),
    validarCampos
], mostrarImagen)

router.post('/', validarArchivoSubir, cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','No es un ID válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios','productos'])),
    validarCampos
], actualizarImagenCloudinary)

module.exports = router;