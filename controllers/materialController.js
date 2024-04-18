const asyncHandler = require("express-async-handler");

const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");
const { uploadSingleFile } = require("../middlewares/uploadfilesMiddlewares");
const Material = require("../models/materialModel");
const Type = require("../models/typeModel");

exports.uploadMaterialFile = uploadSingleFile("file", "materials");

exports.createMaterial = asyncHandler(async (req, res, next) => {
  if (req.params.courseId) req.body.course = req.params.courseId;
  const target = req.body.type;
  const type = await Type.findOne({ type: target });
  if (!type) return next(new ApiError("No title exist with this type", 404));

  const material = await Material.create(req.body);
  type.materials.push({ file: material.file, id: material._id });
  await type.save();
  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.getMaterials = asyncHandler(async (req, res, next) => {
  if (req.params.courseId) req.query.course = req.params.courseId;

  let filter = {};
  if (req.filterObj) filter = req.filterObj;
  const apiFeatures = new ApiFeatures(Material.find(filter), req.query);
  apiFeatures.filter().sort().limitFields().search();
  const { mongooseQuery } = apiFeatures;

  const materials = await mongooseQuery;

  res.status(200).json({
    results: materials.length,
    data: { materials },
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
  const material = await Material.findByIdAndUpdate(
    id,
    { file: req.body.file },
    {
      new: true,
    }
  );
  const type = await Type.findOne({ type: material.type });
  const newMaterials = [];
  type.materials.forEach((el) => {
    if (el.id === id) {
      newMaterials.push({ file: material.file, id: material._id });
    } else newMaterials.push(el);
  });
  type.materials = newMaterials;
  await type.save();
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
  const type = await Type.findOne({ type: material.type });

  const newMaterials = [];
  type.materials.forEach((el) => {
    if (el.id === id) {
      console.log(true);
    } else newMaterials.push(el);
  });
  type.materials = newMaterials;
  await type.save();
  res.status(204).json({
    status: "success",
  });
});
