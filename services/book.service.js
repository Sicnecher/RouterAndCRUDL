import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
_createBooks();

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

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
}

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

function _createBooks() {
  const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
  const books = [];
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbNail: `https://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: "en",
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
    utilService.saveToStorage(BOOK_KEY, books);
  }
}
