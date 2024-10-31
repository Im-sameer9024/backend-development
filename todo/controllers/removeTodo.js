const Todo = require("../models/todoSchema")

exports.removeTodo = async (req, res) => {
  try {
    const { id } = req.params
    await Todo.findByIdAndDelete({ _id: id })

    res.status(400).json({
      success: true,
      message: "Todo is Removed"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}