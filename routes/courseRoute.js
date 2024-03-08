const router = require("express").Router();

const {
  createCourseValidator,
  getCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
} = require("../utils/validators/courseValidators");

const courseController = require("../controllers/courseController");

router.get("/", courseController.getCourses);
router.post("/",createCourseValidator, courseController.createCourse);

router
  .route("/:id")
  .get(getCourseValidator, courseController.getCourse)
  .put(updateCourseValidator, courseController.updateCourse)
  .delete(deleteCourseValidator,courseController.deleteCourse);

module.exports = router;
