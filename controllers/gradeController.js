const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");
const Grade = require("../models/gradeModel");

exports.getGrades = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Grade.find(), req.query);
  apiFeatures.filter().sort().limitFields().search();
  const { mongooseQuery } = apiFeatures;

  const grade = await mongooseQuery.populate({path: 'user course', select: "name"});

  res.status(200).json({
    results: grade.length,
    data: grade,
  });
});

exports.createGrade = asyncHandler(async (req, res, next) => {
  const grade = await Grade.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      grade,
    },
  });
});

exports.getGrade = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const grade = await Grade.findById(id);
  if (!grade) {
    return next(new ApiError(`No grade exist with this id: ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      grade,
    },
  });
});

exports.updateGrade = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const grade = await Grade.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!grade) {
    return next(new ApiError(`No grade exist with this id: ${id}`, 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      grade,
    },
  });
});

exports.deleteGrade = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const grade = await Grade.findByIdAndDelete(id);
  if (!grade) {
    return next(new ApiError(`No grade exist with this id: ${id}`, 404));
  }
  res.status(204).json({
    status: "success",
  });
});
