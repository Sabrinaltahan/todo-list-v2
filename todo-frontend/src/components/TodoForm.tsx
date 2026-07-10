import { useState, type FormEvent } from "react";
import type { CreateTodoData, TodoStatus } from "../types/Todo";

interface TodoFormProps {
  onCreate: (data: CreateTodoData) => Promise<void>;
}

export default function TodoForm({ onCreate }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("not_started");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (trimmedTitle.length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    }

    if (trimmedDescription.length > 200) {
      setError("Description must be maximum 200 characters.");
      return;
    }

    if (!deadline) {
      setError("Deadline is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      await onCreate({
        title: trimmedTitle,
        description: trimmedDescription,
        status,
        deadline,
      });

      setTitle("");
      setDescription("");
      setStatus("not_started");
      setDeadline("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not create todo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new todo</h2>

      {error && <p role="alert">{error}</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={3}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={200}
        />

        <small>{description.length}/200</small>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as TodoStatus)
          }
        >
          <option value="not_started">Not started</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add todo"}
      </button>
    </form>
  );
}