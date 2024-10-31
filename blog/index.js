const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT;
const dbConnection = require("./config/db")
const blog = require("./routes/blog")


app.use(express.json())

app.use("/api",blog)

dbConnection();

app.get("/",(req,res) =>{
  res.send("Home")
})

app.listen(port,()=>{
  console.log(`Server is on ${port}`)
})

