const Center = require("../models/Center");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");

class SearchController {
  // [GET] /search/all
  async search(req, res) {
    try {
      const query = req.params.query;
      const centerPromise = Center.find({
        center_name: { $regex: query, $options: "i" },
      });

      const teacherPromise = Teacher.find({
        teacher_name: { $regex: query, $options: "i" },
      });

      const coursePromise = Course.find({
        course_name: { $regex: query, $options: "i" },
      });

      const [centers, teachers, courses] = await Promise.all([
        centerPromise,
        teacherPromise,
        coursePromise,
      ]);

      res.status(200).json({
        message: "Search successful",
        data: {
          centers,
          teachers,
          courses,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Search failed" });
    }
  }

  // [GET] /search/center
  async searchCenter(req, res) {
    try {
      const query = req.params.query;
      const centerPromise = Center.find({
        center_name: { $regex: query, $options: "i" },
      });

      const [centers] = await Promise.all([centerPromise]);

      res.status(200).json({
        message: "Search Center successful",
        data: {
          centers,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Search Center failed" });
    }
  }

  // [GET] /search/teacher
  async searchTeacher(req, res) {
    try {
      const query = req.params.query;

      const teacherPromise = Teacher.find({
        teacher_name: { $regex: query, $options: "i" },
      });

      const [teachers] = await Promise.all([teacherPromise]);

      res.status(200).json({
        message: "Search Teacher successful",
        data: {
          teachers,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Search Teacher failed" });
    }
  }
}

module.exports = new SearchController();
