const router = require("express").Router();

const {
  getGrades,
  createGrade,
  getGrade,
  updateGrade,
  deleteGrade,
} = require("../controllers/gradeController");
const {
  isAuthenticated,
  allowedTo,
} = require("../middlewares/AuthMiddlewares");

router.use(isAuthenticated);
router
  .route("/")
  .get(getGrades)
  .post(allowedTo("admin", "instructor"), createGrade);

router
  .route("/:id")
  .get(getGrade)
  .put(allowedTo("admin", "instructor"), updateGrade)
  .delete(allowedTo("admin", "instructor"), deleteGrade);

module.exports = router;
