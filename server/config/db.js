const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

const dotenv = require("dotenv");
dotenv.config();

connectDB = async (MONGODB_URL) => {
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.error("ERROR: could not connect", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
