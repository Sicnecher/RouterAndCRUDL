export default function BookFilter() {
  function handleChange({ target }) {
    let { value, name = field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
  }
  return (
    <section className="filter-form-container">
        <h2>Filter</h2>
      <form>
        <section key="1">
          <label>One: </label>
          <input type="text" />
        </section>
        <section key="2">
          <label>One: </label>
          <input type="text" />
        </section>
      </form>
    </section>
  );
}
