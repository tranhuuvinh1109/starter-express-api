const Center = require("../models/Center");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");

class SearchController {
  // [GET] /search
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

      // Chờ các kết quả tìm kiếm từ các model
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
}

module.exports = new SearchController();
