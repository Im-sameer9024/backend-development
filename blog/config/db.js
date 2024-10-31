const mongoose = require("mongoose")
require("dotenv").config()


const dbConnection = () => {
  mongoose.connect(process.env.MONGODB,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log("Database is Connected")

  }).catch((error) => {
    console.log(error)
    process.exit(1)
  })
}

module.exports = dbConnection;