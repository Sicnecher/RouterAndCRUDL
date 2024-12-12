import LongTxt from "../LongTxt";
const { Link } = ReactRouterDOM;

export default function BookPerview({
  bookData,
  shortDescription,
  removeBook,
}) {
  return (
    <section key={bookData.id} className="book-home-container">
      <h4>Title: <LongTxt txt={bookData.title} /></h4>
      <div className="image-container">
        <img src={bookData.thumbnail} alt="book_image" />
        {bookData.listPrice.isOnSale && (
          <div className="on-sale-text">On Sale</div>
        )}
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