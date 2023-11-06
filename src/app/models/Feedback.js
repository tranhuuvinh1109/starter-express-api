const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    teacher_id: { type: Schema.Types.ObjectId, ref: "Teacher" },
    content: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    rate: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Feedback", Feedback);
