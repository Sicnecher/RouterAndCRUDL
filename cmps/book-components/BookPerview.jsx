const {Link} = ReactRouterDOM;

export default function BookPerview({bookData, shortDescription}) {
  return (
    <div>
      <section key={bookData.id} className="book-home-container">
        <h1>{`Title: ${bookData.title}`}</h1>
        <p>{`Description: ${shortDescription}`}</p>
        <img src={bookData.thumbnail} />
        <br />
        <section className="buttons-container">
          <button onClick={() => removeBook(bookData.id)}>Remove</button>
          <Link to={`/book/${bookData.id}`}>
            <button>Details</button>
          </Link>
          <button>Edit</button>
        </section>
      </section>
    </div>
  );
}
