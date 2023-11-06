const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Center = new Schema(
  {
    center_name: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    phone_number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Center", Center);
