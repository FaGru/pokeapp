const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register new User
// @route   POST /users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists already by email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invaild user Data");
  }

  res.json({ message: "Register User" });
});

// @desc    Authenticate a User
// @route   POST /users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

// @desc    Get user data
// @route   GET /users/me
// @access  Public

const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});

// @desc    Update User
// @route   PUT /users/:id
// @access  privat

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc   Delete User
// @route  DELETE /users/:id
// @access  privat

const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getMe,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
