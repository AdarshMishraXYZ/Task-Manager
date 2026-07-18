import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, hasAnyTasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        {hasAnyTasks
          ? "Nothing matches here. Try clearing filters or search."
          : "No entries yet. Start your log with \u201c+ New Entry.\u201d"}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
