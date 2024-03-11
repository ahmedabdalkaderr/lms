const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");


exports.createMaterialValidator = [
  check("material").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];
exports.getMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.updateMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

exports.deleteMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
