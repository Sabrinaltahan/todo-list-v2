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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});