const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");

router.get("/", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
router.post("/", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(); //send user back to frontend
});

router.put("/:id", (req, res) => {
  res.json({ message: `Update User: ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
  res.json({ message: `delete User: ${req.params.id}` });
});

module.exports = router;
