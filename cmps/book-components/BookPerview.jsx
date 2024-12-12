const { Link } = ReactRouterDOM;
const { useEffect } = React;

export default function BookPerview({
  bookData,
  shortDescription,
  removeBook,
}) {

  return (
    <section key={bookData.id} className="book-home-container">
      <h1>{`Title: ${bookData.title}`}</h1>
      {bookData.listPrice.isOnSale && (
        <h2>On Sale!</h2>
      )}
      <div className="image-container">
        <img src={bookData.thumbnail} alt="book_image" />
        <div className="overlay-text">{`Description: ${shortDescription}`}</div>
      </div>
      <br />
      <section className="buttons-container">
        <button onClick={() => removeBook(bookData.id)}>Remove</button>
        <Link to={`/book/${bookData.id}`}>
          <button>Details</button>
        </Link>
      </section>
    </section>
  );
}
