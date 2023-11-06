const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    student_name: { type: String, required: true },
    weight: { type: Number, required: true, default: 0 },
    height: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", Student);
