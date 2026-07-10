import type { CreateTodoData, Todo, TodoStatus } from "../types/Todo";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://todo-list-v2-api.onrender.com";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(data: CreateTodoData): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create todo");
  }

  return response.json();
}

export async function updateTodoStatus(
  id: string,
  status: TodoStatus
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete todo");
  }
}