import { bookService } from "../../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export default function BookAdd() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) loadBook();
  }, []);

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.log("Problem getting book", err);
      });
  }

  function handleChange({ target }) {
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
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    console.log(bookToEdit)
    bookService
      .save(bookToEdit)
      .then(() => navigate("/"))
      .catch((err) => {
        console.log("Cannot save!", err);
      });
  }

  const { title, price } = bookToEdit;
  return (
    <section classtitle="book-edit">
      <h1>{bookId ? "Edit" : "Add"} Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          title="title"
          id="title"
        />

        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          value={price}
          type="number"
          title="price"
          id="price"
        />
        <button>Save</button>
      </form>
    </section>
  );
}
