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

if (todos.length === 0) {
  return <p className="empty-message">No todos yet.</p>;
}

return (
  <section>
    <h2>Todo List</h2>

    <div className="todo-list">
      {todos.map((todo) => (
        <article className="todo-card" key={todo.id}>
          <h3>{todo.title}</h3>

          {todo.description && <p>{todo.description}</p>}

          <p>
            <strong>Deadline:</strong> {todo.deadline}
          </p>

          <div className="todo-actions">
            <select
              value={todo.status}
              aria-label={`Status for ${todo.title}`}
              onChange={(event) =>
                onStatusChange(
                  todo.id,
                  event.target.value as TodoStatus
                )
              }
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>

            <button
              className="delete-button"
              type="button"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);
};