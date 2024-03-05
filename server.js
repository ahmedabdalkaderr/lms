const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const global = require("./middlewares/middlewaresError");
const apiError = require('./utils/apiError');
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute");



dotenv.config({ path: "config.env" });
mongoose
  .connect(process.env.DB_URI)
  .then((con) => {
    console.log(con.connection.host);
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const app = express();


const PORT = process.env.PORT;


app.use(express.json());

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("mode: development");
}

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.all("*", (req, res, next) => {
  next(new apiError(`This url is not exist: ${req.url}`, 400));
});

app.use(global);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
