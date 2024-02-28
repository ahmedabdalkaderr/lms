const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");


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

const userSchema = mongoose.Schema({
  name: String,
});

const UserModel = mongoose.model("User", userSchema);

app.post("/", (req, res) => {
  const name = req.body.name;
  const newuser = new UserModel({ name });
  newuser.save().then((doc) => {
    console.log(doc);
  });
  res.send({ data: newuser });
});

// Routes
app.get("/", (req, res) => {
  res.send("Our API v1");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
