const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");


exports.createMaterialValidator = [
  check("file").notEmpty().withMessage("Please upload your file"),
  check("type").notEmpty().withMessage("Please file type"),
  validatorMiddleware,
];

exports.getMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid material id format"),
  
  validatorMiddleware,
];

exports.updateMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid material id format"),
  validatorMiddleware,
];

exports.deleteMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid material id format"),
  validatorMiddleware,
];
