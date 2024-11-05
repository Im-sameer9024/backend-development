const express = require("express")
const route = express.Router()

const{login,signup} = require("../controllers/Auth")
const{auth,isStudent,isAdmin} = require("../middlewares/authMiddleware")

route.post("/login",login)
route.post("/signup",signup)

route.get("/test",auth,(req,res) =>{
  return res.status(200).json({
    success:true,
    message:"Welcome to the Protected route for Auth"
  })
})

route.get("/student",auth,isStudent,(req,res) =>{
  return res.status(200).json({
    success:true,
    message:"Welcome to the Protected route for Student"
  })
})

route.get("/admin",auth,isAdmin,(req,res) =>{
  return res.status(200).json({
    success:true,
    message:"Welcome to the Protected route for Admin"
  })
})


module.exports = route;
