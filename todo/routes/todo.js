const express = require("express")
const route = express.Router()


const{createTodo} = require("../controllers/createTodo")
const{getTodo,getAllTodo} = require("../controllers/getTodo")
const{removeTodo} = require("../controllers/removeTodo")
const{updateTodo} = require("../controllers/updateTodo")


route.post("/create",createTodo)
route.get("/todo/:id",getTodo)
route.get("/todos",getAllTodo)
route.delete("/remove/:id",removeTodo)
route.put("/update/:id",updateTodo)

module.exports = route;