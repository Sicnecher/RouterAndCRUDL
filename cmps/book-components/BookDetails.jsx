import { bookService } from "../../services/book.service.js";

const { useParams, Link } = ReactRouterDOM;
const { useEffect, useState } = React;

export default function Component() {
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetch = async () => await bookService.get(params.bookId);
    fetch().then((data) => setData(data));
  }, []);
  return (
    data.current.id && (
      <div>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            margin: "12px",
            gap: 26,
          }}
        >
          <h1>{`Title: "${data.current.title}"`}</h1>
          <h4>{`Description: "${data.current.description}"`}</h4>
          <img
            src={data.current.thumbNail}
            alt="image"
            width={250}
            height={400}
            style={{ borderRadius: 4 }}
          />
        </section>
        <section>
          {data.nextId && (
            <Link to="/book/">
              <button></button>
            </Link>
          )}
          {data.prevId && (
            <Link to="/">
              <button>Next</button>
            </Link>
          )}
        </section>
      </div>
    )
  );
}
