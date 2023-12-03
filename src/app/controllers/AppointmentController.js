const Appointment = require("../models/Appointment");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

class AppointmentController {
  // [GET] /all
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.find({})
        .populate("instructor")
        .populate("student");

      res.status(200).json({
        message: "Get all appointments successfully",
        data: appointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get all appointments failed" });
    }
  }

  // [GET] /:id
  async getAppointmentByID(req, res) {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId)
        .populate("instructor")
        .populate("student");

      res.status(200).json({
        message: "Get appointment detail successfully",
        data: appointment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get appointment detail failed" });
    }
  }

  // [POST] /
  async createAppointment(req, res) {
    try {
      const newAppointmentData = req.body;
      const teacherExists = await Teacher.exists({
        _id: newAppointmentData.instructor,
      });
      const studentExists = await Student.exists({
        _id: newAppointmentData.student,
      });

      if (!teacherExists || !studentExists) {
        return res
          .status(400)
          .json({ error: "Invalid teacher or student ID provided" });
      }

      const newAppointment = new Appointment(newAppointmentData);
      await newAppointment.save();

      res.status(201).json({
        message: "Appointment created successfully",
        data: newAppointment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Appointment creation failed" });
    }
  }

  // [PUT] /:id
  async updateAppointment(req, res) {
    try {
      const appointmentId = req.params.id;
      const updatedData = req.body;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        message: "Appointment updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Appointment update failed" });
    }
  }

  // [DELETE] /:id
  async deleteAppointment(req, res) {
    try {
      const appointmentId = req.params.id;
      await Appointment.findByIdAndDelete(appointmentId);

      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Appointment deletion failed" });
    }
  }
}

module.exports = new AppointmentController();
