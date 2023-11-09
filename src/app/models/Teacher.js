const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teacher = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    center_id: { type: Schema.Types.ObjectId, ref: "Center" },
    teacher_name: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    description: { type: String, default: "" },
    certificate: { type: String, default: "" },
    age: { type: Number, default: 0 },
    graduate: { type: String, default: "" },
    experience: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", Teacher);
