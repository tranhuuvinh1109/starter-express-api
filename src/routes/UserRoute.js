const express = require("express");
const UserController = require("../app/controllers/UserController");
const router = express.Router();

router.get("/", UserController.index);
router.get("/:id", UserController.getUserById);
router.patch("/update", UserController.update);

module.exports = router;
