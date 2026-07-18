import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { STORAGE_KEY } from "./constants.js";
import { uid } from "./utils.js";
import TaskList from "./components/TaskList.jsx";
import TaskFormModal from "./components/TaskFormModal.jsx";

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function openNewForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(null);
  }

  function handleSubmit(values) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...values } : t))
      );
    } else {
      setTasks((prev) => [
        ...prev,
        { id: uid(), ...values, completed: false, createdAt: Date.now() },
      ]);
    }
    closeForm();
  }

  function toggleComplete(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app-root">
      <div className="frame">
        <header className="header">
          <div>
            <div className="eyebrow">FIELD LEDGER · TASK LOG</div>
            <h1 className="title">Today's Entries</h1>
          </div>
          <button className="btn btn--primary" onClick={openNewForm}>
            + New Entry
          </button>
        </header>

        <TaskList
          tasks={tasks}
          hasAnyTasks={tasks.length > 0}
          onToggle={toggleComplete}
          onEdit={openEditForm}
          onDelete={deleteTask}
        />
      </div>

      {formOpen && (
        <TaskFormModal
          initialTask={editingTask}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
