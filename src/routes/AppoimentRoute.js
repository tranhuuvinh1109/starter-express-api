const express = require("express");
const AppointmentController = require("../app/controllers/AppointmentController");
const router = express.Router();

router.get("/all", AppointmentController.getAllAppointments);
router.post("/create", AppointmentController.createAppointment);
router.get("/:id", AppointmentController.getAppointmentByID);
router.patch("/update/:id", AppointmentController.updateAppointment);
router.delete("/delete/:id", AppointmentController.deleteAppointment);

module.exports = router;
