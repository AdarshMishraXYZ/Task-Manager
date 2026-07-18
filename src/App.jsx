import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { STORAGE_KEY } from "./constants.js";
import { uid } from "./utils.js";
import TaskList from "./components/TaskList.jsx";
import TaskFormModal from "./components/TaskFormModal.jsx";
import Toolbar from "./components/Toolbar.jsx";
import TagRow from "./components/TagRow.jsx";

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

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

  const allTags = useMemo(() => {
    const s = new Set();
    tasks.forEach((t) => (t.tags || []).forEach((tag) => s.add(tag)));
    return Array.from(s).sort();
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    let list = tasks.slice();

    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    if (activeTag) list = list.filter((t) => (t.tags || []).includes(activeTag));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.notes || "").toLowerCase().includes(q) ||
          (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (sortBy === "priority") return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (sortBy === "alpha") return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [tasks, filter, sortBy, search, activeTag]);

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

        <Toolbar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <TagRow tags={allTags} activeTag={activeTag} setActiveTag={setActiveTag} />

        <TaskList
          tasks={visibleTasks}
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
