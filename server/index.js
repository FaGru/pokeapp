const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 3001;
const { MONGODB_URL } = process.env;

const app = express();
app.use(express.json()); //converts body automaticlly to json object
app.use(express.urlencoded({ extended: false })); // url converter: converts characters to format that they can be transmitted

try {
  mongoose.connect(MONGODB_URL);
  console.log("Connected to MongoDB.");
} catch (error) {
  console.error("ERROR: could not connect", error.message);
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`SERVER RUNS FINE on port ${port}`);
});

app.use("/users", require("./routes/userRoutes"));
