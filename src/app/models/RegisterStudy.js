const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterStudy = new Schema(
  {
    center_id: { type: Schema.Types.ObjectId, ref: "Center" },
    student_id: { type: Schema.Types.ObjectId, ref: "Student" },
    pay: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("RegisterStudy", RegisterStudy);
