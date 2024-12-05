import AppHeader from "./cmps/AppHeader.jsx";
import AboutUs from "./cmps/AboutUs.jsx";
import BookDetails from "./cmps/book-components/BookDetails.jsx";
import BookAdd from "./cmps/book-components/BookAdd.jsx";
import BookIndex from "./cmps/book-components/BookIndex.jsx";
const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<BookIndex />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/book/add" element={<BookAdd />} />
      </Routes>
    </Router>
  );
}
