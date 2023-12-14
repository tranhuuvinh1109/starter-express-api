const Center = require("../models/Center");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Appointment = require("../models/Appointment");

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

  // [GET] /search/course/q=
  async searchCoursse(req, res) {
    try {
      const query = req.params.query;

      const coursePromise = Course.find({
        course_name: { $regex: query, $options: "i" },
      });

      const [courses] = await Promise.all([coursePromise]);

      res.status(200).json({
        message: "Search successful",
        data: {
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

      // Search by center_name or address
      const centerPromise = Center.find({
        $or: [
          { center_name: { $regex: query, $options: "i" } },
          { address: { $regex: query, $options: "i" } },
        ],
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
  // [GET] /search/appointment/start=:start&end=:end&date=:date
  async searchAppointment(req, res) {
    console.log("--------------");
    try {
      const start = req.params.start;
      const end = req.params.end;
      const date = req.params.date;

      const appointmentPromise = Appointment.find({
        date: { $eq: date },
        startTime: { $gte: start },
        endTime: { $lte: end },
      })
        .populate("instructor", "teacher_name") // Populate the instructor information
        .populate("student", "student_name") // Populate the student information
        .populate("course", "course_name"); // Populate the course information

      const [appointments] = await Promise.all([appointmentPromise]);

      res.status(200).json({
        message: "Search Appointment successful",
        data: {
          appointments,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Search Appointment failed" });
    }
  }
}

module.exports = new SearchController();
