const mongoose = require("mongoose")
require("dotenv").config()


const dbConnect = () => {
  mongoose.connect(process.env.MONGODB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log("DataBase is Connected")

  }).catch((error) => {

    console.log(error)
    process.exit(1)
  })
}

module.exports = dbConnect;