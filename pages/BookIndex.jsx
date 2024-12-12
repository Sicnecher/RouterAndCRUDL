import { bookService } from "../services/book.service.js";
import BooksList from "../cmps/book-components/BooksList.jsx";
import BookFilter from "../cmps/book-components/BookFilter.jsx";
import GoogleSearch from "../cmps/GoogleSearch.jsx";
import { showSuccessMsg } from "../services/eventBus.service.js";

const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

export default function BookIndex() {
  const [booksList, setBooksList] = useState([]);
  const [filterBy, setFilterBy] = useState(
    bookService.getDefaultFilter({ title: "", amount: 0, pageCount: 0 })
  );

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  const loadBooks = async () => {
    const books = await bookService.query(filterBy);
    setBooksList(books);
  };

  const removeBook = async (bookId) => {
    await bookService
      .remove(bookId)
      .then(() => {
        setBooksList((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
      })
      .then(() => showSuccessMsg("Book removed successfully"));
  };

  function setNewGoogleBook(book) {
    setBooksList((prevBooks) => [...prevBooks, book]);
  }

  const onSetFilter = (filter) =>
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filter }));

  return (
    <div className="bookIndex-container">
      <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
      <GoogleSearch setNewGoogleBook={setNewGoogleBook} Books={booksList} />
      <Link to="/book/add">
        <button>Add Book</button>
      </Link>
      <BooksList list={booksList} removeBook={removeBook} />
    </div>
  );
}
