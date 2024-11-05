const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.auth = (req, res, next) => {
  try {

    const token = req.body.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is not available"
      })
    }
    // Verify the token 
    try {
      const decode = jwt.verify(token, process.env.JWT_KEY)
      req.user = decode;

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error is occured"
      })

    }

    next()

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error"
    })

  }
}

exports.isStudent = (req, res, next) => {
  try {

    if(req.user.role !== 'Student'){
      return res.status(401).json({
        success:false,
        message:"This is a Protected route for only student"
      })
    }

    next()

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success:false,
      message:"Network issues"
    })

  }
}

exports.isStudent = (req, res, next) => {
  try {

    if(req.user.role !== 'Admin'){
      return res.status(401).json({
        success:false,
        message:"This is a Protected route for only admin"
      })
    }

    next()

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success:false,
      message:"Network issues"
    })

  }
}