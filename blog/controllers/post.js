const Post = require("../models/postSchema")


exports.createPost = async (req, res) => {
  try {

    const { title, description } = req.body;

    const createPost = new Post({
      title, description
    })

    const post = await createPost.save()

    res.status(200).json({
      success: true,
      data: post,
      message: "Post is Created"
    })

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })
  }
}


exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})

    res.status(200).json({
      success: true,
      data: posts,
      message: "All Posts Got"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Network Issues"
    })
  }
}


