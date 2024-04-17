const router = require("express").Router();
const {
  getTypes,
  createType,
  getType,
  updateType,
  deleteType,
} = require("../controllers/typeController");

router.route("/").get(getTypes).post(createType);

router.route("/:id").get(getType).put(updateType).delete(deleteType);

module.exports = router;
