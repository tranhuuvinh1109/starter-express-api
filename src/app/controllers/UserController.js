const User = require("../models/User");

class UserController {
  // [GET] /user
  async index(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json({ message: "success", user: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when query user table." });
    }
  }

  // [PATCH] /user/update
  async update(req, res) {
    try {
      const {
        user_id,
        username,
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
