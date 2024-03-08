const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");

exports.createCourseValidator = [
  check("name")
    .notEmpty()
    .withMessage("Enter course name")
    .custom((val) =>
      Course.findOne({ name: val }).then((course) => {
        if (course) {
          return Promise.reject(new Error("This course already exist"));
        }
      })
    ),
  validatorMiddleware,
];

exports.getCourseValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateCourseValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("name")
    .optional()
    .custom((val) =>
      Course.findOne({ name: val }).then((course) => {
        if (course) {
          return Promise.reject(new Error("This course already exist"));
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteCourseValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
