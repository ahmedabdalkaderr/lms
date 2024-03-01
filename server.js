const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const admin = require('./routes/admin');
const auth = require('./routes/authentication');


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

app.use('/admin', admin);
app.use('/authentication', auth);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
