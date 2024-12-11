import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/eventBus.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

export default function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();
  const { bookId } = useParams();

  const { title } = bookToEdit;

  useEffect(() => {
    if (bookId) loadBook();
  }, []);

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log("Couldnt get back", err));
  }

  function handleChange({ target }) {
    let { value, name: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
		if (!field.includes(".")) {
			setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
		} else {
			const [obj, nested] = field.split(".")
			setBookToEdit((prevBook) => ({
				...prevBook,
				[obj]: { ...prevBook[obj], [nested]: value },
			}))
		}  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then(() => navigate(`/book/${bookId}`))
      .then(showSuccessMsg("book has been saved succesfully"))
      .catch((error) => {
        showErrorMsg("error");
      });
  }

  const { subtitle, authors, publishedDate, description, pageCount, categories, language, listPrice } = bookToEdit;

  return (
    <section className="book-edit">
      <form className="edit-form" onSubmit={onSaveBook}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          onChange={handleChange}
          value={title}
          id="title"
          name="title"
        />
        <label htmlFor="subtitle">Subtitle: </label>
        <textarea
          type="text"
          onChange={handleChange}
          value={subtitle}
          id="subtitle"
          name="subtitle"
        />
        <label htmlFor="authors">Authors: </label>
        <input
          type="text"
          onChange={handleChange}
          value={authors}
          id="authors"
          name="authors"
        />
        <label htmlFor="publishedDate">Published Year: </label>
        <input
          type="number"
          onChange={handleChange}
          value={publishedDate}
          id="publishedDate"
          name="publishedDate"
        />
        <label htmlFor="description">Description: </label>
        <textarea
          type="text"
          onChange={handleChange}
          value={description}
          id="description"
          name="description"
        />
        <label htmlFor="pageCount">Pages: </label>
        <input
          type="number"
          onChange={handleChange}
          value={pageCount}
          id="pageCount"
          name="pageCount"
        />
        <label htmlFor="categories">Categories: </label>
        <input
          type="text"
          onChange={handleChange}
          value={categories}
          id="categories"
          name="categories"
        />
        <label htmlFor="language">Language: </label>
        <input
          type="text"
          onChange={handleChange}
          value={language}
          id="language"
          name="language"
        />
        <label htmlFor="amount">Price: </label>
        <input
          type="number"
          onChange={handleChange}
          value={listPrice.amount}
          id="amount"
          name="listPrice.amount"
        />
        <label htmlFor="currencyCode">Currency: </label>
        <select
          onChange={handleChange}
          value={listPrice.currencyCode || "ILS"}
          id="currencyCode"
          name="listPrice.currencyCode"
        >
          {bookService.getCurrencyCodes().map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <label htmlFor="isOnSale">on Sale: </label>
        <input
          type="checkbox"
          onChange={handleChange}
          id="isOnSale"
          checked={listPrice.isOnSale}
          value={listPrice.isOnSale}
          name="listPrice.isOnSale"
        />
        <div className="btn-container">
          {/* <button onClick={onBack}>Back</button> */}
          <button>Save</button>
        </div>
      </form>
    </section>
  );
}