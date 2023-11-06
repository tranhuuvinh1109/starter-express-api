const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    blog_id: { type: Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", Comment);
