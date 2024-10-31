const express = require("express")
const app = express()
const dbConnect = require("./config/database")
require("dotenv").config()
const port = process.env.PORT
const todo = require("./routes/todo")


app.use(express.json())

// database connection 
dbConnect()

app.use("/api",todo)

app.get("/", (req, res) => {
  res.send("This is my Home Page")
})

app.listen(port,()=>{
  console.log(`Server is on port ${port} `)
})