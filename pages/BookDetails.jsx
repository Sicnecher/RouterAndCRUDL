import { bookService } from "../services/book.service.js";
import AddReview from "../cmps/book-components/AddReview.jsx";
const { useParams, Link, useNavigate } = ReactRouterDOM;
const { useEffect, useState, useRef } = React;

export default function BookDetails() {
  const [data, setData] = useState(null);
  const [readingStatus, setReadingStatus] = useState(null);
  const bookReviewRef = useRef();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => await bookService.get(params.bookId);
    fetch().then((obj) => {
      setData(obj);
      const pageCount = obj.pageCount;
      setReadingStatus(
        pageCount > 500
          ? ["red", "Serious Reading"]
          : pageCount > 200
          ? ["yellow", "Descent Reading"]
          : pageCount < 100 && ["green", "Light Reading"]
      );
    });
  }, [params]);

  function setReviewComponent(bool) {
    bookReviewRef.current.style.display = bool ? "block" : "none";
  }

  if (!data) return <h1>Loading...</h1>;
  return (
    <div className="details-container">
      <section className="button-container">
        {data.prevId && (
          <Link to={`/book/${data.prevId}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </Link>
        )}
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </Link>
        {data.nextId && (
          <Link to={`/book/${data.nextId}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </Link>
        )}
      </section>
      {data.listPrice && data.listPrice.isOnSale && (
        <div className="onSale-sign">
          <h2>On Sale</h2>
        </div>
      )}
      <button onClick={() => setReviewComponent(true)}>Add Review</button>
      <section className="book-card-container">
        <section className="book-data">
          <h1>{`Title: "${data.title}"`}</h1>
          <h4>{`Description: "${data.description}"`}</h4>
          <section
        className="add-review-container"
        style={{ display: "none" }}
        ref={bookReviewRef}
      >
        <svg
          onClick={() => setReviewComponent(false)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
        <AddReview />
      </section>
        </section>
        <img
          src={data.thumbnail}
          alt="image"
          width={250}
          height={400}
          style={{ borderTopLeftRadius: 4, gridArea: "img" }}
        />
        <section className="sub-data" gridArea="sub-data">
          <h1>
            {data.publishedDate && 2024 - data.publishedDate > 10
              ? "Vintage"
              : 2024 - data.publishedDate == 0 && "New"}
          </h1>
          <h4 style={{ color: readingStatus[0] }}>{readingStatus[1]}</h4>
          <h4
            style={{
              color:
                data.listPrice && data.listPrice.amount > 150
                  ? "red"
                  : data.listPrice.amount < 20 && "green",
            }}
          >
            {`Price: ${data.listPrice.amount}`}
          </h4>
        </section>
      </section>
      <br />
    </div>
  );
}
