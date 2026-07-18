export default function TagRow({ tags, activeTag, setActiveTag }) {
  if (tags.length === 0) return null;

  return (
    <div className="tag-row">
      <button
        onClick={() => setActiveTag(null)}
        className={`tag-chip${activeTag === null ? " tag-chip--active" : ""}`}
      >
        all tags
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag === activeTag ? null : tag)}
          className={`tag-chip${activeTag === tag ? " tag-chip--active" : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
