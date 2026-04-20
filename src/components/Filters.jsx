import { categories } from '../data/categories';

function Filters({
  search,
  category,
  month,
  sortBy,
  uniqueMonths,
  onSearchChange,
  onCategoryChange,
  onMonthChange,
  onSortChange
}) {
  return (
    <section className="panel filters-panel">
      <div className="filter-grid">
        <label>
          Search
          <input
            type="text"
            placeholder="Search title or notes"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label>
          Category
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="All">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month
          <select value={month} onChange={(event) => onMonthChange(event.target.value)}>
            <option value="All">All</option>
            {uniqueMonths.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default Filters;