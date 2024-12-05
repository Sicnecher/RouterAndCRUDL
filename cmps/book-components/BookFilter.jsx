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
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: parsedValue }));
  };

  const { title, price } = filterByToEdit;

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form className="filter-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </label>
      </form>
    </section>
  );
}
