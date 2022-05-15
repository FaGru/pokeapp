const UserModel = require("../models/Users");
const asyncHandler = require("express-async-handler");

// @desc   Get Users
// @route  GET /users
// @access  privat

const getUsers = asyncHandler(async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// @desc   Set User
// @route  POST /users
// @access  privat

//WE HAVE TO ADD JSON OR BODY TO IF //////////////////////////////////////

const setUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("pls add a text field");
  }
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(); //send user back to frontend
});

// @desc   Update User
// @route  PUT /users/:id
// @access  privat

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: `update User: ${req.params.id}` });
});

// @desc   Delete User
// @route  DELETE /users/:id
// @access  privat

const deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: `delete User: ${req.params.id}` });
});

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
};
