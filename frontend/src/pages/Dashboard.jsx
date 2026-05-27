import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Loader from "../components/Loader";

const statusColumns = ["Todo", "In Progress", "Done"];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await taskService.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError("Unable to load tasks. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      fetchTasks();
    } catch (err) {
      setError("Unable to create task. Please try again.");
    }
  };

  const handleMoveTask = async (task) => {
    const nextStatus = task.status === "Done" ? "In Progress" : task.status === "Todo" ? "In Progress" : "Done";
    try {
      await taskService.updateTask(task.id, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      setError("Unable to update task status.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Unable to delete task. Please try again.");
    }
  };

  const groupedTasks = statusColumns.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="h3 mb-1">Kanban Dashboard</h1>
          <p className="text-muted mb-0">Organize your tasks by stage and track progress visually.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <TaskForm onSubmit={handleCreateTask} />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <div className="col-lg-8">
          {loading ? (
            <Loader />
          ) : (
            <div className="row gx-3">
              {statusColumns.map((status) => (
                <div key={status} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{status}</h5>
                      <p className="text-muted mb-3">{groupedTasks[status]?.length || 0} tasks</p>
                      <div className="flex-grow-1">
                        {groupedTasks[status]?.length ? (
                          groupedTasks[status].map((task) => (
                            <TaskCard key={task.id} task={task} onMove={handleMoveTask} onDelete={handleDeleteTask} />
                          ))
                        ) : (
                          <div className="card border border-secondary border-opacity-25 rounded-3 text-center py-5">
                            <div className="card-body text-muted">No tasks in this column.</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
