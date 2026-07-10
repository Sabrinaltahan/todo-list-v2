const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "todos.json");

function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

let todos = readTodos();

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Create todo
app.post("/todos", (req, res) => {
  const {
    title,
    description = "",
    status = "not_started",
    deadline,
  } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      message: "Title must be at least 3 characters long",
    });
  }

  if (description.length > 200) {
    return res.status(400).json({
      message: "Description must be maximum 200 characters",
    });
  }

  const allowedStatuses = [
    "not_started",
    "in_progress",
    "done",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  if (!deadline) {
    return res.status(400).json({
      message: "Deadline is required",
    });
  }

  const newTodo = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    status,
    deadline,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});

// Update status
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "not_started",
    "in_progress",
    "done",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todo.status = status;

  saveTodos(todos);

  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const exists = todos.some((todo) => todo.id === id);

  if (!exists) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todos = todos.filter((todo) => todo.id !== id);

  saveTodos(todos);

  res.json({
    message: "Todo deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});