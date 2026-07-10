export type TodoStatus = "not_started" | "in_progress" | "done";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  deadline: string;
  createdAt: string;
}

export interface CreateTodoData {
  title: string;
  description: string;
  status: TodoStatus;
  deadline: string;
}