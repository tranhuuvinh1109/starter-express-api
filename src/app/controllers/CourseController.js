const Course = require("../models/Course");
const Teacher = require("../models/Teacher");

class CourseController {
  // [GET] /all
  async get(req, res) {
    try {
      const courses = await Course.find({}).populate("teacher_id");

      res
        .status(200)
        .json({ message: "Get all courses successfully", data: courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get all courses failed" });
    }
  }

  async create(req, res) {
    try {
      const newCourseData = req.body;
      const newCourse = new Course(newCourseData);
      await newCourse.save();

      res
        .status(201)
        .json({ message: "Course created successfully", data: newCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Course creation failed" });
    }
  }

  // [GET] /:id
  async detail(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);

      res
        .status(200)
        .json({ message: "Get course detail successfully", data: course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get course detail failed" });
    }
  }

  async update(req, res) {
    try {
      const courseId = req.params.id;
      const updatedData = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updatedData,
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Course updated successfully", data: updatedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Course update failed" });
    }
  }

  async delete(req, res) {
    try {
      const courseId = req.params.id;
      await Course.findByIdAndDelete(courseId);

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Course deletion failed" });
    }
  }
}

module.exports = new CourseController();
