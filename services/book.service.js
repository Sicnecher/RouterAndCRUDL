import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { books } from "../books.js";

const BOOK_KEY = "bookDB";
utilService.saveToStorage(BOOK_KEY, books);

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getAllBooks,
};

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      books = books.filter((book) => regExp.test(book.vendor));
    }

    if (filterBy.minSpeed) {
      books = books.filter((book) => book.maxSpeed >= filterBy.minSpeed);
    }
    return books;
  });
}

async function get(bookId){
  return await storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
};

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(vendor = "", maxSpeed = "") {
  return { vendor, maxSpeed };
}

function getDefaultFilter(filterBy = { txt: "", minSpeed: 0 }) {
  return { txt: filterBy.txt, minSpeed: filterBy.minSpeed };
}

function getAllBooks() {
  const books = utilService.loadFromStorage(BOOK_KEY);
  return books;
}

function _setNextPrevBookId(book){
    return query().then(books => {
        const bookIdx = books.findIndex(currBook => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextId = nextBook.id
        book.prevId = prevBook.id
        return book
    })
}