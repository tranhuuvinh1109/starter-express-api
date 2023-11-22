const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

class AuthController {
  // [POST] /auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const userData = { ...user._doc };
      delete userData.password;

      res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    }
  }

  // [POST] /auth/register
  async register(req, res) {
    let newUser;
    try {
      const { email, type, phone } = req.body;
      const existingUserByEmail = await User.findOne({ email });
      const existingUserByPhone = await User.findOne({ phone });

      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      if (existingUserByPhone) {
        return res
          .status(400)
          .json({ error: "User with this phone number already exists" });
      }

      newUser = new User(req.body);
      await newUser.save();

      if (type === 1) {
        const { teacher_name } = req.body;
        const newTeacher = new Teacher({
          user_id: newUser._id,
          teacher_name: teacher_name,
        });

        await newTeacher.save();
        const result = await User.aggregate([
          {
            $match: {
              _id: newUser._id,
            },
          },
          {
            $lookup: {
              from: "teachers",
              localField: "_id",
              foreignField: "user_id",
              as: "teacher_info",
            },
          },
        ]);
        const userData = result[0];
        delete userData.password;

        res
          .status(200)
          .json({ message: "Registration successful", data: userData });
      } else {
        const { student_name, weight, height } = req.body;
        const newStudent = new Student({
          user_id: newUser._id,
          student_name: student_name,
          weight: weight,
          height: height,
        });

        await newStudent.save();
        const userData = { ...newUser._doc };
        delete userData.password;

        res
          .status(200)
          .json({ message: "Registration successful", data: userData });
      }
    } catch (error) {
      console.error(error);
      if (newUser) {
        await User.findByIdAndDelete(newUser._id);
      }
      res.status(500).json({ error: "Registration failed" });
    }
  }
}

module.exports = new AuthController();
