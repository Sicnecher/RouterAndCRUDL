import { bookService } from "../../services/book.service.js";

const { useState } = React;

export default function AddReview() {
  const [review, setReview] = useState(bookService.getEmptyReview());

  function handleChange({ target }) {
    let { id, value, title: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    if (target.classList[1] == "bi-star-fill" || target.classList[1] == "bi-star") {
      value = parseInt(id);
      console.log("value: ", value);
    }
    setReview((prevReview) => ({ ...prevReview, [field]: value }));
    console.log(review)
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  const { fullname, rate, readAt } = review;
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <section>
        <label htmlFor="fullname">Full Name: </label>
        <input
          type="text"
          value={fullname}
          onChange={handleChange}
          placeholder="Full Name"
          title="fullname"
          id="fullname"
        />
      </section>
      <section className="rating-container">
        <label htmlFor="rating">Rating: </label>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div title="rating" className="rate-star" onClick={handleChange}>
            <i
              id={`${idx + 1}`}
              className={ rate >= idx+1 ? "bi bi-star-fill" : "bi bi-star"}
            ></i>
          </div>
        ))}
      </section>
      <section>
        <label htmlFor="readAt">Read At: </label>
        <input
          type="date"
          value={readAt}
          onChange={handleChange}
          title="readAt"
          id="readAt"
        />
      </section>
    </form>
  );
}
