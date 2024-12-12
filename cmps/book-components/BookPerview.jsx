import LongTxt from "../LongTxt";
const { Link } = ReactRouterDOM;

export default function BookPerview({
  bookData,
  shortDescription,
  removeBook,
}) {
  return (
    <section key={bookData.id} className="book-home-container">
      <h4>
        Title: <LongTxt txt={bookData.title} />
      </h4>
      <div className="image-container">
        <img src={bookData.thumbnail} alt="book_image" />
        {bookData.listPrice.isOnSale && (
          <div className="on-sale-text">On Sale</div>
        )}
        <div className="overlay-text">{`Description: ${shortDescription}`}</div>
      </div>
      <br />
      <section style={{background: "white", padding: 10, borderRadius: 10}} className="buttons-container">
      <i style={{color: 'black'}} className="bi bi-trash3" onClick={() => removeBook(bookData.id)}></i>
        <Link to={`/book/${bookData.id}`}>
          <div>Details</div>
        </Link>
        <Link to={`/book/edit/${bookData.id}`}>
          <i style={{color: 'black'}} className="bi bi-pencil-square"></i>
        </Link>
      </section>
    </section>
  );
}
