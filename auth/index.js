const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT;
const dbConnect = require("./config/db")
const user = require("./routes/user")


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api",user)

dbConnect()


app.get("/",(req,res) =>{
  res.send("HOME")
})

app.listen(port,()=>{
  console.log(`Port is on ${port}`)
})



