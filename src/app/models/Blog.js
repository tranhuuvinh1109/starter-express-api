const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Blog", Blog);
