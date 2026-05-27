import { useState } from "react";

const stageOptions = ["Todo", "In Progress", "Done"];

export default function TaskForm({ initialData = {}, onSubmit, submitLabel = "Create Task" }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [stage, setStage] = useState(initialData.stage || "Todo");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), stage });
    setTitle("");
    setDescription("");
    setStage("Todo");
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">New Task</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Title
            </label>
            <input
              id="taskTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a short title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">
              Description
            </label>
            <textarea
              id="taskDescription"
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about the task"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskStage" className="form-label">
              Stage
            </label>
            <select
              id="taskStage"
              className="form-select"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              {stageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
