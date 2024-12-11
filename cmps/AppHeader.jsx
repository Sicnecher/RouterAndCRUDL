const { Link } = ReactRouterDOM;
export default function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h2>React Books App</h2>
        <section className="links-container">
          <div>
            <Link to="/home">Home</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
        </section>
      </section>
    </header>
  );
}
