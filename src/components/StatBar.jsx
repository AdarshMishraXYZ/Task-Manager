import { useMemo } from "react";
import { isOverdue } from "../utils.js";

export default function StatBar({ tasks }) {
  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      overdue: tasks.filter(isOverdue).length,
    }),
    [tasks]
  );

  return (
    <div className="stat-bar">
      <div className="stat-item">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">logged</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-num">{stats.completed}</span>
        <span className="stat-label">closed</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className={`stat-num${stats.overdue > 0 ? " stat-num--overdue" : ""}`}>
          {stats.overdue}
        </span>
        <span className="stat-label">overdue</span>
      </div>
    </div>
  );
}
