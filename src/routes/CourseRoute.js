const express = require("express");
const CourseController = require("../app/controllers/CourseController");
const router = express.Router();

router.get("/all", CourseController.get);
router.post("/create", CourseController.create);
router.get("/:id", CourseController.detail);
router.patch("/update/:id", CourseController.update);
router.delete("/delete/:id", CourseController.delete);

module.exports = router;
