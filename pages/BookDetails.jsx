import { bookService } from "../services/book.service.js";
import AddReview from "../cmps/book-components/AddReview.jsx";
import LongTxt from "../cmps/LongTxt.jsx";
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
      console.log(obj);
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
  console.log(data);
  const {
    title,
    description,
    listPrice,
    publishedDate,
    thumbnail,
    nextId,
    prevId,
    reviews,
  } = data;
  return (
    <div className="details-container">
      <section className="button-container">
        <Link to={`/book/${prevId}`}>
          <i className="bi bi-arrow-left"></i>
        </Link>
        <Link to="/">
          <i className="bi bi-list"></i>
        </Link>
        <Link to={`/book/edit/${params.bookId}`}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Link to={`/book/${nextId}`}>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </section>
      {listPrice && listPrice.isOnSale && (
        <div className="onSale-sign">
          <h2>On Sale</h2>
        </div>
      )}
      <section className="book-card-container">
        <section className="book-data">
          <h1>{`Title: "${title}"`}</h1>
          <h4>Description: <LongTxt txt={description} /></h4>
          <section className="reviews-container">
            <h3>Reviews:</h3>
            <ol>
              {reviews && reviews.map(({ fullname, rate, readAt }) => (
                <li>
                  <h4>{`Full Name: ${fullname}`}</h4>
                  <h4>{`Rating: ${rate}`}</h4>
                  <h4>{`Read At: ${readAt}`}</h4>
                </li>
              ))}
            </ol>
          </section>
          <div
            className="add-review-button"
            onClick={() => setReviewComponent(true)}
          >
            <h4>Add Review</h4>
            <i className="bi bi-plus-circle"></i>
          </div>
          <section
            className="add-review-container"
            style={{ display: "none" }}
            ref={bookReviewRef}
          >
            <i
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={() => setReviewComponent(false)}
              className="bi bi-x-circle"
            ></i>
            <AddReview bookId={params.bookId} navigate={navigate} />
          </section>
        </section>
        <img
          src={thumbnail}
          alt="image"
          width={250}
          height={400}
          style={{ borderTopLeftRadius: 4, gridArea: "img" }}
        />
        <section className="sub-data" gridArea="sub-data">
          <h1>
            {publishedDate && 2024 - publishedDate > 10
              ? "Vintage"
              : 2024 - publishedDate == 0 && "New"}
          </h1>
          <h4 style={{ color: readingStatus[0] }}>{readingStatus[1]}</h4>
          <h4
            style={{
              color:
                listPrice && listPrice.amount > 150
                  ? "red"
                  : listPrice.amount < 20 && "green",
            }}
          >
            {`Price: ${listPrice.amount}`}
          </h4>
        </section>
      </section>
      <br />
    </div>
  );
}
