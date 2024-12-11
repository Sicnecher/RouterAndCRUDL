import { bookService } from "../../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export default function BookAdd() {
  const [bookToAdd, setBookToAdd] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    console.log(bookToAdd)
  }, [])

  function handleChange({ target }) {
    console.log(target)
    let { value, title: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setBookToAdd((prevBook) => ({ ...prevBook, [field]: value }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    console.log(bookToAdd);
    bookService
      .save(bookToAdd)
      .then(() => navigate("/"))
      .catch((err) => {
        console.log("Cannot save!", err);
      });
  }

  return (
    <section className="book-add">
      <h1>{bookId ? "Edit" : "Add"} Book</h1>
      <form className="book-add-form-container" onSubmit={onSaveBook}>
        {Object.entries(bookToAdd).map(([key, value]) => (
          key !== "thumbnail" &&
          <section>
            <label htmlFor={`${key}`}>{key}: </label>
            <input
              onChange={handleChange}
              value={value}
              type={
                key == "price" || key == "pageCount"
                  ? "number"
                  : key == "publishedDate"
                  ? "date"
                  : key == "text"
              }
              title={`${key}`}
              id={`${key}`}
            />
          </section>
        ))}
        <button>Save</button>
      </form>
    </section>
  );
}
