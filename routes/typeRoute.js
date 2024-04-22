const router = require("express").Router();
const {
  getTypes,
  createType,
  getType,
  updateType,
  deleteType,
} = require("../controllers/typeController");
const { isAuthenticated } = require("../middlewares/AuthMiddlewares");

router.use(isAuthenticated);
router.route("/").get(getTypes).post(createType);

router.route("/:id").get(getType).put(updateType).delete(deleteType);

module.exports = router;
