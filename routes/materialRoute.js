const router = require("express").Router({ mergeParams: true });

const {
  createMaterialValidator,
  getMaterialValidator,
  updateMaterialValidator,
  deleteMaterialValidator,
} = require("../utils/validators/materialValidator");

const {
  uploadMaterialFile,
  createMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");
const {
  isAuthenticated,
  allowedTo,
} = require("../middlewares/AuthMiddlewares");

router.use(isAuthenticated);

router
  .route("/")
  .get(getMaterials)
  .post(
    allowedTo("admin", "instructor"),
    uploadMaterialFile,
    createMaterialValidator,
    createMaterial
  );

router
  .route("/:id")
  .get(getMaterialValidator, getMaterial)
  .put(
    allowedTo("admin", "instructor"),
    uploadMaterialFile,
    updateMaterialValidator,
    updateMaterial
  )
  .delete(
    allowedTo("admin", "instructor"),
    deleteMaterialValidator,
    deleteMaterial
  );

module.exports = router;
