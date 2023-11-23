const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Center = require("../models/Center");

class UserController {
  // [GET] /user
  async index(req, res) {
    try {
      const users = await User.find({}).select("-password");
      res.status(200).json({ message: "success", user: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when query user table." });
    }
  }

  // [GET] /user/:id
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.type === 1) {
        // User is a teacher, fetch additional teacher info
        const teacher = await Teacher.findOne({ user_id: userId }).populate(
          "center_id"
        );
        if (!teacher) {
          return res.status(404).json({ error: "Teacher info not found" });
        }

        const userData = {
          ...user._doc,
          teacher_info: {
            _id: teacher._id,
            teacher_name: teacher.teacher_name,
            center_id: teacher.center_id,
            // Add other teacher-related fields here
          },
        };

        return res.status(200).json({ message: "success", user: userData });
      } else if (user.type === 0) {
        // User is a student, fetch additional student info
        const student = await Student.findOne({ user_id: userId });

        if (!student) {
          return res.status(404).json({ error: "Student info not found" });
        }

        const userData = {
          ...user._doc,
          student_info: {
            _id: student._id,
            student_name: student.student_name,
            weight: student.weight,
            height: student.height,
            // Add other student-related fields here
          },
        };

        return res.status(200).json({ message: "success", user: userData });
      } else {
        // Unsupported user type
        return res.status(400).json({ error: "Unsupported user type" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error when querying user by ID." });
    }
  }

  // [PATCH] /user/update
  async update(req, res) {
    try {
      const {
        user_id,
        username,
        fullname,
        email,
        password,
        avatar,
        gender,
        address,
        phone,
        type,
        weight,
        height,
      } = req.body;
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.username = username || user.username;
      user.fullname = fullname || user.fullname;
      user.email = email || user.email;
      user.password = password || user.password;
      user.avatar = avatar || user.avatar;
      user.gender = gender || user.gender;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      user.type = type || user.type;
      user.weight = weight || user.weight;
      user.height = height || user.height;

      await user.save();

      res.status(200).json({ message: "Update User successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Update User Fail" });
    }
  }
}

module.exports = new UserController();
