import { bookService } from "../../services/book.service.js";
import BooksList from "./BooksList.jsx";
import BookFilter from "./BookFilter.jsx"
const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

export default function Component() {
  const [booksList, setBooksList] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  useEffect(() => {
    const list = bookService.getAllBooks();
    setBooksList(list);
  }, []);

  async function removeBook(bookId) {
    await bookService.remove(bookId).then(() => {
      const filteredList = booksList.filter((x) => x.id != bookId);
      setBooksList(filteredList);
    });
  }

  return (
    <div>
      <BookFilter />
      <BooksList list={booksList} removeBook={removeBook} />
    </div>
  );
}
