const { Link } = ReactRouterDOM;
export default function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h2>BookNarnia</h2>
        <h4>The land of the books!</h4>
        <section className="links-container">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/books">Books</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
        </section>
      </section>
    </header>
  );
}
