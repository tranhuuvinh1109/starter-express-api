const express = require("express");
const RootController = require("../app/controllers/RootController");
const SearchController = require("../app/controllers/SearchController");
const router = express.Router();

router.get("/search/all/q=:query", SearchController.search);
router.get("/search/center/q=:query", SearchController.searchCenter);
router.get("/search/teacher/q=:query", SearchController.searchTeacher);
router.get("/search/course/q=:query", SearchController.searchCoursse);
router.get(
  "/search/course/by-teacher/q=:teacherId",
  SearchController.searchCourseByTeacher
);
router.get(
  "/search/appointment/start=:start&end=:end&date=:date",
  SearchController.searchAppointment
);
router.get("/", RootController.index);

module.exports = router;
