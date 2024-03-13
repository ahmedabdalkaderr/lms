const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const { uploadSingleFile } = require("../middlewares/uploadfilesMiddlewares");
const Material = require("../models/materialModel");

exports.uploadMaterialFile = uploadSingleFile("file", "materials");

exports.createMaterial = asyncHandler(async (req, res, next) => {
  if(req.params.courseId) req.body.course = req.params.courseId;
  const material = await Material.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.getMaterials = asyncHandler(async (req, res, next) => {
  if (req.params.courseId) req.query.course = req.params.courseId;

  const materials = await Material.find(req.query);
  res.status(200).json({
    status: "success",
    length: materials.length,
    data: {
      materials,
    },
  });
});

exports.getMaterial = asyncHandler(async (req, res, next) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    return next(new ApiError("No material exist with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.updateMaterial = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const material = await Material.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!material) {
    return next(new ApiError(`No material exist with this id: ${id}`, 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.deleteMaterial = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const material = await Material.findByIdAndDelete(id);
  if (!material) {
    return next(new ApiError(`No material exist with this id: ${id}`, 404));
  }
  res.status(204).json({
    status: "success",
  });
});
