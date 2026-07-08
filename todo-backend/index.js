const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, description = "", status = "not_started", deadline } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters long" });
  }

  if (description.length > 200) {
    return res.status(400).json({ message: "Description must be maximum 200 characters" });
  }

  const allowedStatuses = ["not_started", "in_progress", "done"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (!deadline) {
    return res.status(400).json({ message: "Deadline is required" });
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

  res.status(201).json(newTodo);
});


app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["not_started", "in_progress", "done"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.status = status;

  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});