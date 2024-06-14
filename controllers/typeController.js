const asyncHandler = require("express-async-handler");
const Type = require("../models/typeModel");
const Material = require("../models/materialModel");

const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");

exports.getTypes = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Type, req.query);
  apiFeatures.filter().sort().limitFields().search();
  const { mongooseQuery } = apiFeatures;
  const types = await mongooseQuery;
  types.reverse();
  const qr = req.query.type;
  if (req.user.role === 'user' && qr && qr.includes("Task")) {
    console.log(5);
    const x = [];
    types[0].materials.forEach((material) => {
      console.log(material.user, req.user._id.toString());
      if (material.user === req.user._id.toString()) {
        x.push(material);
        return;
      }
    });
    types[0].materials = x;
  }


 res.status(200).json({
    results: types.length,
    data: { types },
  });
});

exports.createType = asyncHandler(async (req, res, next) => {
  if (req.body.type === "task") {
    req.body.type = "Task";
  }

  const check = await Type.findOne(req.body);
  if (check) return next(new ApiError(`This title already exist`, 404));

  const type = await Type.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      type,
    },
  });
});

exports.getType = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const type = await Type.findById(id);

  if (!type) {
    return next(new ApiError(`No title exist with this id: ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      type,
    },
  });
});

exports.updateType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const type = await Type.findByIdAndUpdate(id, req.body, { new: true });
  if (!type) {
    return next(new ApiError(`No title exist with this id: ${id}`, 404));
  }
  const target = type.type;
  type.materials.forEach(async function (el) {
    const material = await Material.findByIdAndUpdate(
      el.id,
      { type: target },
      { new: true }
    );
  });

  return res.status(200).json({
    status: "success",
    data: {
      type,
    },
  });
});

exports.deleteType = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const type = await Type.findByIdAndDelete(id);
  if (!type) {
    return next(new ApiError(`No title exist with this id: ${id}`, 404));
  }

  type.materials.forEach(async function (el) {
    const material = await Material.findByIdAndDelete(el.id);
    // await material.save();
  });
  res.status(204).json({
    status: "success",
  });
});
