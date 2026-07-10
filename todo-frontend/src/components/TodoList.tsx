import type { Todo, TodoStatus } from "../types/Todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: TodoStatus) => Promise<void>;
}

export default function TodoList({
  todos,
  onDelete,
  onStatusChange,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p>No todos yet.</p>;
  }

  return (
    <div>
      <h2>Todo List</h2>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>

          <p>{todo.description}</p>

          <p>
            <strong>Deadline:</strong> {todo.deadline}
          </p>

          <select
            value={todo.status}
            onChange={(e) =>
              onStatusChange(todo.id, e.target.value as TodoStatus)
            }
          >
            <option value="not_started">Not started</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={() => onDelete(todo.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}