const express = require("express");
const router = express.Router();

const { getUsers, setUser, updateUser, deleteUser } = require("../controllers/userController");

router.route("/").get(getUsers).post(setUser);
router.get("/", getUsers);
router.post("/", setUser);

router.route("/:id").put(updateUser).delete(deleteUser);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
