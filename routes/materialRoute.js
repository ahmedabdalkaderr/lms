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

const multer = require("multer");
const getFields = multer();

router.use(isAuthenticated);

router
  .route("/")
  .get(getMaterials)
  .post(
    uploadMaterialFile,
    createMaterialValidator,
    createMaterial
  );

router
  .route("/:id")
  .get(getMaterialValidator, getMaterial)
  .put(
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
