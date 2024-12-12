const {Link} = ReactRouterDOM;

export default function Home() {
  return (
    <section className="home">
      <h1>Welcome to BookNarnia!</h1>
      <h2>The vast imagination land of books and stries</h2>
      <h4>What do we have here?</h4>
      <ul>
        <li>
          A variety of books witth all the required information about them!
        </li>
        <li>option to create and put your own books on sale!</li>
        <li>
          Quick access to google engine for a list of thousands of different
          books!
        </li>
        <li>And much more...</li>
      </ul>
      <h2>So what are you waiting for?</h2>
      <h4>Start exploring now!</h4>
      <section>
        <Link to="/books">
          <button>Go to book list!</button>
        </Link>
        <Link to="/about">
          <button>Go to about us!</button>
        </Link>
      </section>
    </section>
  );
}
