import { debounce } from "../../services/util.service.js";
const { useState, useEffect, useRef } = React;

export default function BookFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter);
  const debouncedFilter = useRef(debounce(onSetFilter, 500)).current;
  const rangeRef = useRef();

  useEffect(() => {
    debouncedFilter(filterByToEdit);
  }, [filterByToEdit]);

  const handleChange = ({ target }) => {
    const { name, value, type } = target;
    const parsedValue = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: parsedValue }));
  };

  const { title, amount, pageCount } = filterByToEdit;

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form className="filter-form">
      <section>
          <label htmlFor="min-price">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Min' Price: </label>
					<input
						ref={rangeRef}
						value={amount}
						type="range"
						max={500}
						id="price-filter"
						name="amount"
						className="price-filter"
						onChange={handleChange}
					/>
          {amount}
        </section>
        <section>
          <label htmlFor="min-price">Page Count: </label>
					<input
						ref={rangeRef}
						value={pageCount}
						type="range"
						max={500}
						id="price-filter"
						name="pageCount"
						className="price-filter"
						onChange={handleChange}
					/>
          {pageCount}
        </section>
      </form>
    </section>
  );
}
