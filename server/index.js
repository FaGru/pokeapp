const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const dotenv = require("dotenv");

dotenv.config();
const { MONGODB_URL } = process.env;

app.use(express.json()); //converts automatically to json

try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to MongoDB.");
} catch (error) {
  console.error("ERROR: could not connect", error.message);
}


app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(); //send user back to frontend
});

let db = mongoose.connection;

app.listen(3001, () => {
  console.log("SERVER RUNS FINE");
});
