import { bookService } from "../../services/book.service.js";
const { useParams, Link } = ReactRouterDOM;
const { useEffect, useState } = React;

export default function Component() {
  const [data, setData] = useState(null);
  const [readingStatus, setReadingStatus] = useState(null);
  const params = useParams();
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
  }, []);
  if (!data) return <h1>Loading...</h1>;
  return (
    <div>
      {data.listPrice.isOnSale && (
        <div className="onSale-sign">
          <h2>On Sale</h2>
        </div>
      )}
      <section className="book-card-container">
        <section className="book-data">
          <h1>{`Title: "${data.title}"`}</h1>
          <h4>{`Description: "${data.description}"`}</h4>
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
            {2024 - data.publishedDate > 10
              ? "Vintage"
              : 2024 - data.publishedDate == 0 && "New"}
          </h1>
          <h4 style={{ color: readingStatus[0] }}>{readingStatus[1]}</h4>
          <h4
            style={{
              color:
                data.listPrice.amount > 150
                  ? "red"
                  : data.listPrice.amount < 20 && "green",
            }}
          >
            {`Price: ${data.listPrice.amount}`}
          </h4>
        </section>
      </section>
      <br />
      <section className="button-container">
        {data.prevId && (
          <Link to={`/book/${data.prevId}`}>
            <button>PrevBook</button>
          </Link>
        )}
        <Link to="/">
          <button>Back to list</button>
        </Link>
        {data.nextId && (
          <Link to={`/book/${data.nextId}`}>
            <button>NextBook</button>
          </Link>
        )}
      </section>
    </div>
  );
}