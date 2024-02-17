const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// get all todos
const getTodos = async (req, res) => {
  // const all_todos = await Todo.find({}).sort({ createdAt: -1 });
  // res.status(200).json(all_todos);

  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a todo
const createTodo = async (req, res) => {
  // const { todo } = req.body;
  // let emptyFields = [];
  // if (!todo) {
  //   emptyFields.push("todo");
  // }
  // if (emptyFields.length > 0) {
  //   return res.status(400).json({ error: "Error no todo found!", emptyFields });
  // }
  // // add to the database
  // try {
  //   const created_todo = await Todo.create({ todo });
  //   res.status(200).json(created_todo);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
  try {
    const { todo, status } = req.body;
    const newTodo = await Todo.create({ todo, status: false });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todo
const deleteTodo = async (req, res) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such todo" });
  // }
  // const todo = await Todo.findOneAndDelete({ _id: id });
  // if (!todo) {
  //   return res.status(400).json({ error: "No such todo" });
  // }
  // res.status(200).json(todo);
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a todo
const updateTodo = async (req, res) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "No such todo" });
  // }
  // const todo = await Todo.findOneAndUpdate(
  //   { _id: id },
  //   {
  //     ...req.body,
  //   }
  // );
  // if (!todo) {
  //   return res.status(400).json({ error: "No such todo" });
  // }
  // res.status(200).json(todo);

  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTodo = await Todo.updateOne({ _id: id }, { status: !status });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
