const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    teacher_id: { type: Schema.Types.ObjectId, ref: "Teacher" },
    course_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    image: { type: String, required: false },
    schedule: { type: String, required: true },
    number_of_students: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", Course);
