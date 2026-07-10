import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import {
  getTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "./api/todoApi";

import type {
  Todo,
  CreateTodoData,
  TodoStatus,
} from "./types/Todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch {
      setError("Could not load todos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleCreate(data: CreateTodoData) {
    const todo = await createTodo(data);
    setTodos((prev) => [...prev, todo]);
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  async function handleStatusChange(
    id: string,
    status: TodoStatus
  ) {
    const updated = await updateTodoStatus(id, status);

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updated : todo))
    );
  }

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Todo List</h1>

      <TodoForm onCreate={handleCreate} />

      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}

export default App;