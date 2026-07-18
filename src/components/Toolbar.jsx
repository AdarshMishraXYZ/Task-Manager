const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Open" },
  { key: "completed", label: "Closed" },
];

export default function Toolbar({ filter, setFilter, search, setSearch, sortBy, setSortBy }) {
  return (
    <div className="toolbar">
      <div className="tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`tab${filter === f.key ? " tab--active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <input
        className="search-input"
        placeholder="Search entries…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="dueDate">Sort: Due date</option>
        <option value="priority">Sort: Priority</option>
        <option value="alpha">Sort: A–Z</option>
      </select>
    </div>
  );
}
