const Comment = require("../models/commentSchema")
const Post = require("../models/postSchema")


exports.createComment = async (req, res) => {
  try {
    const { user, description, post } = req.body

    const createComment = new Comment({
      user, description
    })

    const savedComment = await createComment.save()

    const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
      .populate("comments")
      .exec()

    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Comment is created"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}


exports.deleteComment = async (req, res) => {
  try {

    const { id } = req.params;
    const { post } = req.body;
    const deletedComment = await Comment.findByIdAndDelete({ _id: id })

    const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { comments: deletedComment._id } }, { new: true })
      .populate("comments")
      .exec()


    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Comment is Deleted"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}