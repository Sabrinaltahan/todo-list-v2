import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles/App.css";

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
      setError("");

      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not load todos."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleCreate(data: CreateTodoData) {
    try {
      setError("");

      const todo = await createTodo(data);

      setTodos((prev) => [...prev, todo]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not create todo.";

      setError(message);
      throw error;
    }
  }

  async function handleDelete(id: string) {
    try {
      setError("");

      await deleteTodo(id);

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete todo."
      );
    }
  }

  async function handleStatusChange(
    id: string,
    status: TodoStatus
  ) {
    try {
      setError("");

      const updated = await updateTodoStatus(id, status);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? updated : todo
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not update todo status."
      );
    }
  }

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

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