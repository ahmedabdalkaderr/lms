const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 3 })
    .withMessage("Too short User name"),

  check("email")
    .notEmpty()
    .withMessage("User email required")
    .isEmail()
    .withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  check("role").optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("name").optional().isLength({min: 3}).withMessage('Too short user name'),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val, {req}) =>
      User.findOne({ email: val }).then((user) => {
        if (user._id != req.params.id) {
          return Promise.reject(new Error("E-mail already in user"));
        }
        else return true;
      })
    ),

  check("role").optional(),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
