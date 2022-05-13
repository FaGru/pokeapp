const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const port = process.env.PORT || 3001;

dotenv.config();
const { MONGODB_URL } = process.env;
app.use(express.json()); //converts automatically to json

try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to MongoDB.");
} catch (error) {
  console.error("ERROR: could not connect", error.message);
}

app.listen(port, () => {
  console.log(`SERVER RUNS FINE on port ${port}`);
});

app.use("/users", require("./routes/userRoutes"));
