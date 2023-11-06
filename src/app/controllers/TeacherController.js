const Teacher = require("../models/Teacher");

class TeacherController {
  // [GET] /teacher
  async index(req, res) {
    try {
      const teachers = await Teacher.find({});
      res.status(200).json({ message: "success", data: teachers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when query Teacher table." });
    }
  }

  // [GET] /teacher/full
  async getFullData(req, res) {
    try {
      const teachers = await Teacher.find({}).populate("user_id");
      res.status(200).json({ message: "success", data: teachers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when query Teacher table." });
    }
  }

  // [GET] /teacher/full/:id
  async getFullDataByID(req, res) {
    try {
      const teacherId = req.params.id;
      const teacher = await Teacher.findById(teacherId).populate("user_id");

      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      res.status(200).json({ message: "success", data: teacher });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when querying Teacher table." });
    }
  }

  // [POST] /teacher/create
  async create(req, res) {
    try {
      const newTeacher = new Teacher(req.body);
      await newTeacher.save();
      res
        .status(200)
        .json({ message: "Create Teacher successfully", data: newTeacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Create Teacher Fail" });
    }
  }

  // [PATCH] /teacher/update
  async updateData(req, res) {
    try {
      const teacherId = req.body.teacher_id;
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        req.body,
        { new: true }
      );

      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      res.status(200).json({
        message: "Update Teacher successfully",
        data: updatedTeacher,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Update Teacher Fail" });
    }
  }
}

module.exports = new TeacherController();
