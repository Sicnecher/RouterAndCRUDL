import { debounce } from "../../services/util.service.js";
const { useState, useEffect, useRef } = React;

export default function BookFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter);
  const debouncedFilter = useRef(debounce(onSetFilter, 500)).current;
  const rangeRef = useRef();

  useEffect(() => {
    console.log(filterByToEdit);
  }, [])

  useEffect(() => {
    debouncedFilter(filterByToEdit);
  }, [filterByToEdit, debouncedFilter]);

  const handleChange = ({ target }) => {
    const { name, value, type } = target;
    const parsedValue = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: parsedValue }));
  };

  const { title, price } = filterByToEdit;

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form className="filter-form">
      <section>
          <label htmlFor="min-price">Title: </label>
          <input
            type="number"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Min' Price: </label>
					<input
						ref={rangeRef}
						value={filterByToEdit.amount}
						type="range"
						max={500}
						id="price-filter"
						name="amount"
						className="price-filter"
						onChange={handleChange}
					/>
          {filterByToEdit.amount}
        </section>
        <section>
          <label htmlFor="min-price">Page Count: </label>
					<input
						ref={rangeRef}
						value={filterByToEdit.pageCount}
						type="range"
						max={500}
						id="price-filter"
						name="pageCount"
						className="price-filter"
						onChange={handleChange}
					/>
          {filterByToEdit.pageCount}
        </section>
      </form>
    </section>
  );
}
