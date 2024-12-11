import { debounce } from "../../services/util.service.js";
const { useState, useEffect, useRef } = React;

export default function BookFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter);
  const debouncedFilter = useRef(debounce(onSetFilter, 500)).current;

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
          <label htmlFor="min-price">Min Price: </label>
          <input
            type="number"
            name="min-price"
            value={price}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Max Price: </label>
          <input
            type="number"
            name="min-price"
            value={price}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Min Price: </label>
          <input
            type="number"
            name="min-price"
            value={price}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Min Price: </label>
          <input
            type="number"
            name="min-price"
            value={price}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="min-price">Min Price: </label>
          <input
            type="number"
            name="min-price"
            value={price}
            onChange={handleChange}
          />
        </section>
      </form>
    </section>
  );
}
