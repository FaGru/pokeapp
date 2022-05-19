const User = require("../models/userModel");
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild user Data");
  }
});

// @desc    Authenticate a User
// @route   POST /users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check if email exists
  const user = await User.findOne({ email });

  //compare plain password with hased db password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild credentials");
  }
});

// @desc    Get user data
// @route   GET /users/me
// @access  Private

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

// Generate JWT --> ID is Payload
// Takes 3 Arguments ID, the JWT_Secret and the expiry date
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getMe,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
