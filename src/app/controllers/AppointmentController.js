const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Course = require("../models/Course");
const ObjectId = mongoose.Types.ObjectId;
class AppointmentController {
  // [GET] /all
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.find({})
        .populate({
          path: "course",
          select:
            "price number_of_students teacher_id course_name description image schedule createdAt updatedAt",
          populate: {
            path: "teacher_id",
            select: "teacher_name",
            populate: {
              path: "center_id",
              select: "address",
            },
          },
        })
        .populate("student", "student_name");
      // Transform the appointments to the desired format
      const transformedAppointments = appointments.map((appointment) => ({
        _id: appointment._id,
        course_name: appointment.course.course_name,
        teacher_name: appointment.course.teacher_id.teacher_name,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        student_name: appointment.student.student_name,
        center_address: appointment.course.teacher_id.center_id.address,
        status: appointment.status,
      }));
      res.status(200).json({
        message: "Get all appointments successfully",
        data: transformedAppointments,
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
        .populate({
          path: "course",
          select:
            "price number_of_students teacher_id course_name description image schedule createdAt updatedAt",
          populate: {
            path: "teacher_id",
            select: "teacher_name",
            populate: {
              path: "center_id",
              select: "address",
            },
          },
        })
        .populate("student", "student_name");
      const transformedAppointments = {
        _id: appointment._id,
        course_name: appointment.course.course_name,
        teacher_name: appointment.course.teacher_id.teacher_name,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        student_name: appointment.student.student_name,
        center_address: appointment.course.teacher_id.center_id.address,
        status: appointment.status,
      };
      res.status(200).json({
        message: "Get appointment detail successfully",
        data: transformedAppointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get appointment detail failed" });
    }
  }
  // [GET] /appointment-of-student/:id
  async getAppointmentsOfStudent(req, res) {
    try {
      const studentId = req.params.id;

      const appointments = await Appointment.find({ student: studentId })
        .populate({
          path: "course",
          select:
            "price number_of_students teacher_id course_name description image schedule createdAt updatedAt",
          populate: {
            path: "teacher_id",
            select: "teacher_name",
            populate: {
              path: "center_id",
              select: "address",
            },
          },
        })
        .populate("student", "student_name");

      // Transform the appointments to the desired format
      const transformedAppointments = appointments.map((appointment) => ({
        _id: appointment._id,
        course_name: appointment.course.course_name,
        teacher_name: appointment.course.teacher_id.teacher_name,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        student_name: appointment.student.student_name,
        center_address: appointment.course.teacher_id.center_id.address,
        status: appointment.status,
      }));

      res.status(200).json({
        message: "Get appointments of the student successfully",
        data: transformedAppointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Get appointments of the student failed" });
    }
  }

  // [POST] /
  async createAppointment(req, res) {
    try {
      const newAppointmentData = req.body;

      // Check if the specified teacher, student, and course IDs exist
      const teacherExists = await Teacher.exists({
        _id: newAppointmentData.instructor,
      });
      const studentExists = await Student.exists({
        _id: newAppointmentData.student,
      });
      const courseExists = await Course.exists({
        _id: newAppointmentData.course,
      });

      if (!teacherExists || !studentExists || !courseExists) {
        return res
          .status(400)
          .json({ error: "Invalid teacher, student, or course ID provided" });
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

  async deleteAppointment(req, res) {
    try {
      const appointmentId = req.params.id;
      console.log("id: ", appointmentId);

      // Convert the string ID to ObjectId explicitly
      const validObjectId = ObjectId.isValid(appointmentId)
        ? new ObjectId(appointmentId)
        : null;

      if (!validObjectId) {
        return res
          .status(400)
          .json({ error: "Invalid appointment ID provided" });
      }

      await Appointment.findByIdAndDelete(validObjectId);

      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Appointment deletion failed" });
    }
  }
}

module.exports = new AppointmentController();
