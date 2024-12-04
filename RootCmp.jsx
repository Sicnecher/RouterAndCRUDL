import AppHeader from "./cmps/AppHeader.jsx";
import Home from "./cmps/book-components/BookIndex.jsx";
import AboutUs from "./cmps/AboutUs.jsx";
import BookDetails from "./cmps/book-components/BookDetails.jsx";
import BookEdit from "./cmps/book-components/BookEdit.jsx";
import BookIndex from "./cmps/book-components/BookIndex.jsx";
const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        {/* <Route path="/book/:bookId" element={<BookIndex />} /> */}
        <Route path="/book/edit/:bookId" element={<BookEdit />} />
      </Routes>
    </Router>
  );
}
