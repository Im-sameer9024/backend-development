const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwt_key = process.env.JWT_KEY;
const cookie = require("cookie")


const MAX_ATTEMPTS = 3

const hashPassword = async (password, attempts = 0) => {
  try {

    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword

  } catch (error) {

    if (attempts < MAX_ATTEMPTS - 1) {

      return hashPassword(password, attempts + 1)

    } else {
      throw new Error("Error issues in password hashing")
    }

  }

}


exports.signup = async (req, res) => {
  try {

    // fetch all data from req ki body 
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User is already Registered"
      })
    }

    // hash the password and save in db 

    let finalPassword = await hashPassword(password);

    // save the data in db 

    const userData = new User({
      name, email, password: finalPassword, role
    })
    console.log(userData)

    const savedUser = await userData.save()

    res.status(200).json({
      success: true,
      data: savedUser,
      message: "User is Registered"
    })


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}

exports.login = async (req, res) => {
  try {

    // fetch the data 

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please enter the email and password carefully"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role
    }

    if (await bcrypt.compare(password, user.password)) {

      let token = jwt.sign(payload, jwt_key, { expiresIn: "2h" })

      const userObject = user.toObject()
      userObject.token = token;
      userObject.password = undefined

      const maxAge = parseInt(process.env.COOKIE_AGE, 10)

      res.cookie("token", token, { maxAge, httpOnly: true }).status(200).json({
        success: true,
        token,
        data: userObject,
        message: "User Logged In"
      })

    } else {
      return res.status(403).json({
        success: false,
        message: "Password is Incorrect"
      })
    }

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Network Issues"
    })

  }
}