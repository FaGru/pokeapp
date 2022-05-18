const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getMe, updateUser, deleteUser } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
