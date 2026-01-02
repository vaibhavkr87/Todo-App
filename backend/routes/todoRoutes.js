import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// READ
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTodo);
});

// DELETE ALL COMPLETED TODOS
router.delete("/completed", async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: "Completed todos cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear completed todos" });
  }
});


export default router;
