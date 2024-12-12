import { bookService } from "../services/book.service.js";
import BooksList from "../cmps/book-components/BooksList.jsx";
import BookFilter from "../cmps/book-components/BookFilter.jsx";

const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

export default function BookIndex() {
  const [booksList, setBooksList] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter({ title: '', amount: 0, pageCount: 0 }));

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  const loadBooks = async () => {
    const books = await bookService.query(filterBy);
    setBooksList(books);
  };

  const removeBook = async (bookId) => {
    await bookService.remove(bookId);
    setBooksList((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  function setNewGoogleBook(book) {
		setBooks((books) => [...books, book])
	}

  const onSetFilter = (filter) => setFilterBy((prevFilter) => ({ ...prevFilter, ...filter }));

  return (
    <div className="bookIndex-container">
      <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
      <GoogleSearch setNewGoogleBook={setNewGoogleBook} Books={books}/>
      <BooksList list={booksList} removeBook={removeBook} />
      <Link to="/book/add"><button>Add Book</button></Link>
    </div>
  );
}
