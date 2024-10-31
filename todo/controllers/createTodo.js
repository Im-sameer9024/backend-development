const Todo = require("../models/todoSchema")

exports.createTodo = async(req,res) => {
  try {

    const { title, description } = req.body;

    const TodoCreate = await Todo.create({ title, description })

    res.status(400).json({
      success: true,
      data: TodoCreate,
      message: "Todo is Created"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Network Error'
    })
  }
}