import { useEffect, useRef, useState } from "react";
import { PRIORITIES } from "../constants.js";

const emptyDraft = {
  title: "",
  notes: "",
  dueDate: "",
  priority: "medium",
  tags: "",
};

export default function TaskFormModal({ initialTask, onSubmit, onClose }) {
  const [draft, setDraft] = useState(
    initialTask
      ? {
          title: initialTask.title,
          notes: initialTask.notes || "",
          dueDate: initialTask.dueDate || "",
          priority: initialTask.priority,
          tags: (initialTask.tags || []).join(", "),
        }
      : emptyDraft
  );
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const tags = draft.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      title: draft.title.trim(),
      notes: draft.notes.trim(),
      dueDate: draft.dueDate,
      priority: draft.priority,
      tags,
    });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header">
          <span className="modal-title">{initialTask ? "Edit Entry" : "New Entry"}</span>
          <button type="button" className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <label className="field-label">Title</label>
        <input
          ref={titleRef}
          className="input"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="What needs doing?"
          required
        />

        <label className="field-label">Notes</label>
        <textarea
          className="input textarea"
          value={draft.notes}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          placeholder="Optional detail…"
        />

        <div className="form-row">
          <div className="form-col">
            <label className="field-label">Due date</label>
            <input
              type="date"
              className="input"
              value={draft.dueDate}
              onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
            />
          </div>
          <div className="form-col">
            <label className="field-label">Priority</label>
            <select
              className="input"
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
            >
              {PRIORITIES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="field-label">Tags (comma-separated)</label>
        <input
          className="input"
          value={draft.tags}
          onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
          placeholder="work, personal…"
        />

        <div className="form-actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {initialTask ? "Save Changes" : "Add Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
