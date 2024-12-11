const { Link } = ReactRouterDOM;
const { useEffect } = React;

export default function BookPerview({
  bookData,
  shortDescription,
  removeBook,
}) {
  useEffect(() => {
    console.log(bookData.listPrice);
  }, []);

  return (
    <section key={bookData.id} className="book-home-container">
      <h1>{`Title: ${bookData.title}`}</h1>
      {bookData.listPrice.isOnSale && (
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dsale&psig=AOvVaw2qjBpiRUamhEMSxDSbroly&ust=1734019885279000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjtpdaNoIoDFQAAAAAdAAAAABAE"
          className="sale-tag"
        />
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
