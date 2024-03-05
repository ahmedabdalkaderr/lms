const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

const apiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.logIn = asyncHandler(async (req, res, next) => {
  const password = req.body.password;


  const user = await User.findOne({ email: req.body.email });
  let isEqual;
  if (user) {
    isEqual = await bcrypt.compare(req.body.password, user.password);
  }

  if (!isEqual || !user) {
    return next(new apiError("email or password is not correct", 400));
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );

  res.status(200).json({
    data: {
      user,
    },
    token: token,
  });
  
});


