const asyncHandler = require("express-async-handler");
const multer = require('multer');
const { v4: uuidv4 } = require("uuid");

const ApiError = require("../utils/apiError");
// const { uploadSingleFile } = require("../middlewares/uploadfilesMiddlewares");
const Material = require("../models/materialModel");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/materials`);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    const fileName = `materials-${uuidv4()}-${Date.now()}.${ext}`;
    req.body.specification = fileName;
    cb(null, fileName);
  },
});
const upload = multer({ storage: multerStorage });

exports.uploadMaterialSepcification = upload.single("specification");

// exports.getMaterials = asyncHandler(async (req, res) => {
//   const materials = await Material.find();
//   res.status(200).json({
//     status: "success",
//     length: materials.length,
//     data: {
//       materials,
//     },
//   });
// });

exports.getMaterials = asyncHandler(async (req, res, next) => {
  let materials;
  if (req.params.courseId)
    materials = await Material.findOne({ course: req.params.courseId });
  else materials = await Material.find();

  res.status(200).json({
    status: "success",
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
  console.log(req.body.specification);
  const material = await Material.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  // console.log(material);

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
