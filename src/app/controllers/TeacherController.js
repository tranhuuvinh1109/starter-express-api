const Teacher = require("../models/Teacher");
const User = require("../models/User");
const Center = require("../models/Center");

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

  // // [GET] /teacher/full
  // async getFullData(req, res) {
  //   try {
  //     const teachers = await Teacher.find({}).populate("user_id");
  //     res.status(200).json({ message: "success", data: teachers });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Error when query Teacher table." });
  //   }
  // }
  // [GET] /teacher/full
  async getFullData(req, res) {
    try {
      const teachers = await Teacher.find({})
        .populate("user_id")
        .populate("center_id");

      const data = teachers.map((teacher) => {
        const user = teacher.user_id;
        const center = teacher.center_id;

        return {
          age: teacher.age,
          _id: teacher._id,
          user_id: user._id,
          teacher_name: teacher.teacher_name,
          description: teacher.description,
          certificate: teacher.certificate,
          graduate: teacher.graduate,
          experience: teacher.experience,
          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt,
          __v: teacher.__v,
          image: teacher.image,
          center_id: center._id,
          username: user.username,
          email: user.email,
          gender: user.gender,
          address: user.address,
          avatar: user.avatar,
          phone: user.phone,
          type: user.type,
          centerName: center.center_name,
        };
      });

      res.status(200).json({ message: "success", data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when querying Teacher table." });
    }
  }

  // [GET] /teacher/full/:id
  async getFullDataByID(req, res) {
    try {
      const teacherId = req.params.id;
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      const user = await User.findById(teacher.user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const center = await Center.findById(teacher.center_id);

      if (!center) {
        return res.status(404).json({ error: "Center not found" });
      }

      const data = {
        ...teacher.toObject(), // Chuyển đổi teacher thành một plain object
        username: user.username,
        email: user.email,
        gender: user.gender,
        address: user.address,
        avatar: user.avatar,
        phone: user.phone,
        weight: user.weight,
        height: user.height,
        type: user.type,
        centerName: center.center_name,
      };

      res.status(200).json({ message: "success", data });
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
