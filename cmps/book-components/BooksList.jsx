import BookPerview from "./BookPerview.jsx";

export default function BooksList({ list, removeBook }) {
  return (
    list.length !== 0 && (
      <section className="home">
        {list.map(book => {
          const shortDescription =
            book.description.length > 60
              ? book.description.slice(0, 60) + "..."
              : book.description;
          return (
            <div>
              <BookPerview
                bookData={book}
                shortDescription={shortDescription}
                removeBook={removeBook}
              />
            </div>
          );
        })}
      </section>
    )
  );
}
