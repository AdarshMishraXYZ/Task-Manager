export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function fmtDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return task.dueDate < todayISO();
}

export function isToday(iso) {
  return iso === todayISO();
}
