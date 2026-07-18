import { PRIORITIES } from "../constants.js";
import { fmtDate, isOverdue, isToday } from "../utils.js";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const prio = PRIORITIES.find((p) => p.key === task.priority) || PRIORITIES[1];
  const overdue = isOverdue(task);

  return (
    <div className={`task-card${task.completed ? " task-card--done" : ""}`}>
      <button
        aria-label={task.completed ? "Mark as open" : "Mark as done"}
        onClick={() => onToggle(task.id)}
        className={`checkbox${task.completed ? " checkbox--checked" : ""}`}
      >
        {task.completed && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="task-body">
        <div className="task-top">
          <span className={`task-title${task.completed ? " task-title--strike" : ""}`}>
            {task.title}
          </span>
          <span className={`priority-dot priority-dot--${prio.key}`} title={prio.label} />
        </div>

        {task.notes && <div className="task-notes">{task.notes}</div>}

        <div className="meta-row">
          {task.dueDate && (
            <span className={`meta-chip${overdue ? " meta-chip--overdue" : isToday(task.dueDate) ? " meta-chip--today" : ""}`}>
              {overdue ? "OVERDUE · " : ""}
              {fmtDate(task.dueDate)}
            </span>
          )}
          <span className={`meta-chip meta-chip--priority-${prio.key}`}>{prio.label}</span>
          {(task.tags || []).map((tag) => (
            <span key={tag} className="meta-chip">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label="Edit">
          ✎
        </button>
        <button className="icon-btn" onClick={() => onDelete(task.id)} aria-label="Delete">
          ✕
        </button>
      </div>

      {task.completed && <div className="stamp">DONE</div>}
    </div>
  );
}
