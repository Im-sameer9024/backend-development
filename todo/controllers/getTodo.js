const Todo = require("../models/todoSchema")

exports.getTodo = async (req, res) => {
  try {

    const { id } = req.params;

    const todo = await Todo.findById({ _id: id })

    res.status(400).json({
      success: true,
      data: todo,
      message: "Todo is got"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}


exports.getAllTodo = async (req, res) => {
  try {

    const allTodos = await Todo.find({})

    res.status(400).json({
      success: true,
      data: allTodos,
      message: "todos gotted"
    })

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}