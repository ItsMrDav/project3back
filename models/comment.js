const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
