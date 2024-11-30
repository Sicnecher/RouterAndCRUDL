import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

export default function Component() {
  const [booksList, setBooksList] = useState([]);
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
    booksList.length !== 0 && (
      <section className="home">
        {booksList.map((book) => {
          const shortDescription =
            book.description.length > 60
              ? book.description.slice(0, 60) + "..."
              : book.description;
          return (
            <section key={book.id} className="book-home-container">
              <h1>{`Title: ${book.title}`}</h1>
              <p>{`Description: ${shortDescription}`}</p>
              <img src={book.thumbNail} />
              <section className="buttons-container">
                <button onClick={() => removeBook(book.id)}>Remove</button>
                <Link to={`/book/${book.id}`}>
                  <button>Details</button>
                </Link>
                <button>Edit</button>
              </section>
            </section>
          );
        })}
      </section>
    )
  );
}
