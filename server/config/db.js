const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.error("ERROR: could not connect", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
