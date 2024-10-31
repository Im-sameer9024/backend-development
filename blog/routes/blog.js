const express = require("express")
const route = express.Router()


const { createPost, getAllPost } = require("../controllers/post")
const { createComment, deleteComment } = require("../controllers/comment")
const { like, unlike } = require("../controllers/like")

route.post("/create", createPost)
route.get("/posts", getAllPost)

route.post("/comment", createComment)
route.delete("/deleteComment/:id", deleteComment)

route.post("/like", like)
route.delete("/unlike/:id", unlike)

module.exports = route