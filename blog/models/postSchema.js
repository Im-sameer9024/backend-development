const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    maxLength:30,
  },

  description:{
    type:String,
    required:true,
    maxLength:40,
  },

  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Like"
  }],

  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }]

},{timestamps:true,minimize:true})

module.exports = mongoose.model("Post",postSchema)