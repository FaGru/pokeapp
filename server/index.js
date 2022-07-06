const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json()); //converts body automaticlly to json object
app.use(express.urlencoded({ extended: false })); // url converter: converts characters to format that they can be transmitted
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connectDB();

app.use(errorHandler);

app.listen(port, () => {
  console.log(`SERVER RUNS FINE on port ${port}`);
});

app.use("/users", require("./routes/userRoutes"));
app.use("/pokemon", require("./routes/pokemonRoutes"));
