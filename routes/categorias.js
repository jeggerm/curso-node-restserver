const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - público
router.get('/', obtenerCategorias);

// Obtener una categorias por id - público
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos    
], obtenerCategoria);

// Crear una categoría - privado - token válido
router.post('/', [
    validarJWT,
    check('nombre','Nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoría - privado
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre de la Categoria es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','El Id es inválido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);




module.exports = router;