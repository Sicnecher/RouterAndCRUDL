const { Link } = ReactRouterDOM;

export default function BookPerview({ bookData, shortDescription, removeBook }) {
  return (
    <section key={bookData.id} className="book-home-container">
      <h1>{`Title: ${bookData.title}`}</h1>
      <div className="image-container">
        <img src={bookData.thumbnail} />
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
