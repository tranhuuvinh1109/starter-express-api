const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Center = require("../models/Center");

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
      const { email, type, phone, center_id } = req.body;

      // Check if the center_id exists in the Center collection
      const existingCenter = await Center.findById(center_id);
      console.log("center --> ", existingCenter);
      if (!existingCenter) {
        return res
          .status(400)
          .json({ error: "Invalid center_id. Center not found." });
      }

      const existingUserByEmail = await User.findOne({ email });
      const existingUserByPhone = await User.findOne({ phone });

      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ error: "User with this email already exists." });
      }

      if (existingUserByPhone) {
        return res
          .status(400)
          .json({ error: "User with this phone number already exists." });
      }

      newUser = new User(req.body);
      await newUser.save();

      if (type === 1) {
        const { teacher_name } = req.body;
        const newTeacher = new Teacher({
          user_id: newUser._id,
          teacher_name: teacher_name,
          center_id: center_id,
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
        // Handle student registration logic
      }
    } catch (error) {
      console.error(error);
      if (newUser) {
        await User.findByIdAndDelete(newUser._id);
      }
      res
        .status(500)
        .json({ error: "Registration failed. Please try again later." });
    }
  }
}

module.exports = new AuthController();
