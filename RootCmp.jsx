import AppHeader from "./cmps/AppHeader.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import BookAdd from "./cmps/book-components/BookAdd.jsx";
import BookIndex from "./pages/BookIndex.jsx";
import BookEdit from "./pages/BookEdit.jsx";
import UserMsg from "./cmps/UserMsg.jsx";
const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
  return (
    <section>
      <main>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<BookIndex />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/add" element={<BookAdd />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
          </Routes>
        </Router>
      </main>
      <UserMsg />
    </section>
  );
}
