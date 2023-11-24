const Center = require("../models/Center");
const Teacher = require("../models/Teacher");

class CenterController {
  // [GET] /all
  async get(req, res) {
    try {
      const centers = await Center.find({});

      res
        .status(200)
        .json({ message: "Get all center successfully", data: centers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get all center failed" });
    }
  }

  // [GET] /:id
  async detail(req, res) {
    try {
      const centerId = req.params.id;
      const center = await Center.findById(centerId);

      if (!center) {
        return res.status(404).json({ error: "Center not found" });
      }

      const teachers = await Teacher.find({
        center_id: centerId,
      }).select(
        "teacher_name image description certificate graduate experience"
      );

      const data = {
        _id: center._id,
        center_name: center.center_name,
        manager: center.manager,
        email: center.email,
        address: center.address,
        description: center.description,
        image: center.image,
        phone_number: center.phone_number,
        teachers: teachers,
      };

      res
        .status(200)
        .json({ message: "Get center detail successfully", data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get center detail failed" });
    }
  }

  // [POST] /create
  async create(req, res) {
    try {
      const newCenterData = req.body;
      const newCenter = new Center(newCenterData);
      await newCenter.save();

      res
        .status(200)
        .json({ message: "Center created successfully", data: newCenter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Center creation failed" });
    }
  }

  // [PATH] /update/:id
  async update(req, res) {
    try {
      const centerId = req.params.id;
      const updatedData = req.body;
      const updatedCenter = await Center.findByIdAndUpdate(
        centerId,
        updatedData,
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Center updated successfully", data: updatedCenter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Center update failed" });
    }
  }

  // [DELETE] /delete/:id
  async delete(req, res) {
    try {
      const centerId = req.params.id;
      await Center.findByIdAndDelete(centerId);

      res.status(200).json({ message: "Center deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Center deletion failed" });
    }
  }
}

module.exports = new CenterController();
