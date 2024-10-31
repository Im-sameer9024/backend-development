const Todo = require("../models/todoSchema")

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate({ _id: id }, { title, description, updateAt: Date.now()}).populate()

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo is Updated"
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      success: false,
      message: "Network Issues"
    })

  }
}