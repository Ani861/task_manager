export default function TaskCard({ task, onMove, onDelete }) {
  const nextStage = {
    Todo: "In Progress",
    "In Progress": "Done",
    Done: "In Progress",
  };

  const actionLabel =
    task.stage === "Done" ? "Move to In Progress" : `Move to ${nextStage[task.stage]}`;
  const buttonClass =
    task.stage === "Done" ? "btn btn-sm btn-outline-warning" : "btn btn-sm btn-outline-success";

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{task.title}</h5>
          <span className="badge bg-secondary">{task.stage}</span>
        </div>
        <p className="card-text text-muted">{task.description}</p>
        <div className="d-flex justify-content-between gap-2 flex-wrap">
          <button className={buttonClass} onClick={() => onMove(task)}>
            {actionLabel}
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
