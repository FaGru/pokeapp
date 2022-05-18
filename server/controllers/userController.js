const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc    Register new User
// @route   POST /users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
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
