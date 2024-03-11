const router = require("express").Router({ mergeParams: true });

const {
  getMaterialValidator,
  updateMaterialValidator,
  deleteMaterialValidator,
} = require("../utils/validators/materialValidator");

const {
  uploadMaterialSepcification,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");


router
  .route("/")
  .get(getMaterials)

router
  .route("/:id")
  .get(getMaterialValidator, getMaterial)
  .put(uploadMaterialSepcification, updateMaterialValidator, updateMaterial)
  .delete(deleteMaterialValidator, deleteMaterial);

module.exports = router;
