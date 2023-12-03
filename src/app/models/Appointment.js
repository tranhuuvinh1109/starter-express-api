const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema(
  {
    instructor: { type: Schema.Types.ObjectId, ref: "Teacher" },
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    date: { type: String, required: true },
    startTime: { type: String },
    endTime: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Appointment", Appointment);
