const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
})

module.exports = mongoose.model("Comment",commentSchema)