
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AbouteUs />} />
            <Route path="/book" element={<BookDetails />} />
            <Route path="/book/:bookId" element={<BookIndex />} />
            <Route path="/book/edit" element={<BookEdit />} />
        </Router>
    )
}