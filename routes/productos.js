const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/Productos

// Obtener todas las Productos - público
router.get("/", obtenerProductos);

// Obtener una Productos por id - público
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// Crear una categoría - privado - token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("categoria", "El ID de categoria no es válido").isMongoId(),
    check("categoria").custom( existeProductoPorId ),
    validarCampos,
  ],
  crearProducto
);

// Actualizar un producto - privado
router.put(
  "/:id",
  [
    validarJWT,    
    //check("categoria", "El ID de categoria no es válido").isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar un producto - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El Id es inválido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
