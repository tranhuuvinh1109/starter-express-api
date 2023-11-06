const express = require("express");
const CenterController = require("../app/controllers/CenterController");
const router = express.Router();

router.get("/all", CenterController.get);
router.post("/create", CenterController.create);
router.get("/:id", CenterController.detail);
router.patch("/update/:id", CenterController.update);
router.delete("/delete/:id", CenterController.delete);

module.exports = router;
