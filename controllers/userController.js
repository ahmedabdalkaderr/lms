const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const ApiError = require("../utils/apiError");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`No user exist with this id: ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({ email });
  if (user) {
    return next(new ApiError("E-mail already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  req.body.password = hashedPassword;

  user = await User.create(req.body);

  res.status(201).json({
    message: "User created successfully",
    data: {
      user,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params.id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password,12),
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(`No user exist with this id: ${id}`, 404));
  }

  return res.status(200).json({
    message: "User updated successfully",
    data: {
      user,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new ApiError(`No user exist with this id: ${id}`, 404));
  }
  res.status(204).json({
    message: "User deleted successfully",
  });
});
