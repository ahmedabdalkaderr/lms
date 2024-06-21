const { check, body } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");

exports.createGradeValidator = [
  body("user")
    .optional()
    .isMongoId()
    .withMessage("Invalid user id format")
    .custom((val, { req }) => {
      if (
        val.toString() !== req.user._id.toString() &&
        req.user.role === "user"
      ) {
        return Promise.reject(
          new Error("You are not allowed to access this route")
        );
      } else return true;
    }),
  body("course")
    .notEmpty()
    .withMessage("User name required")
    .isMongoId()
    .withMessage("Invalid course id format")
    .custom((val, { req }) =>
      Course.findById(val).then((course) => {
        if (!req.body.user) req.body.user = req.user._id;
        if (!course) {
          return Promise.reject(new Error("This course is not exist"));
        } else return true;
      })
    ),
  body("mark").notEmpty().withMessage("Enter student mark"),

  validatorMiddleware,
];

exports.getGradeValidator = [
  check("id").isMongoId().withMessage("Invalid grade id format"),
  validatorMiddleware,
];

exports.updateGradeValidator = [
  check("id").isMongoId().withMessage("Invalid grade id format"),
  body("course")
    .optional()
    .isMongoId()
    .withMessage("Invalid course id format")
    .custom((val, { req }) =>
      Course.findOne({ _id: val }).then((course) => {
        if (!course) {
          return Promise.reject(new Error("This course is not exist"));
        } else return true;
      })
    ),
  validatorMiddleware,
];

exports.deleteGradeValidator = [
  check("id").isMongoId().withMessage("Invalid grade id format"),
  validatorMiddleware,
];
