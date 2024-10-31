const Like = require("../models/likeSchema")
const Post = require("../models/postSchema")

exports.like = async (req, res) => {
  try {
    const { user, post } = req.body;

    const createLike = new Like({
      user, post
    })

    const savedLike = await createLike.save()

    const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
      .populate("likes")
      .exec()

    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Post is Liked"
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Network Error"
    })

  }
}

exports.unlike = async (req, res) => {
  try {
    const { id } = req.params;
    const {post} = req.body;

    console.log(post)

    const unlike = await Like.findByIdAndDelete({ _id: id })

    const updatePost = await Post.findByIdAndUpdate(post, { $pull: { likes: unlike._id } }, { new: true })
      .populate("likes")
      .exec()

    res.status(200).json({
      success: true,
      data: updatePost,
      message: "Unlike the post"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Network error"
    })

  }
} 