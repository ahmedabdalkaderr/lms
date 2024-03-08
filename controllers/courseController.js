const asyncHandler = require("express-async-handler");

const Course = require("../models/courseModel");
const ApiError = require("../utils/apiError");

exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    status: "success",
    length: courses.length,
    data: {
      courses,
    },
  });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id);
  if (!course) {
    return next(new ApiError(`No course exist with this id: ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  console.log(5);
  const course = await Course.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

  if (!course) {
    return next(new ApiError(`No course exist with this id: ${id}`, 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return next(new ApiError(`No course exist with this id: ${id}`, 404));
  }
  res.status(204).json({
    status: "success",
  });
});
