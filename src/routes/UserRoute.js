const express = require("express");
const UserController = require("../app/controllers/UserController");
const router = express.Router();

router.get("/", UserController.index);
router.patch("/update", UserController.update);

module.exports = router;
