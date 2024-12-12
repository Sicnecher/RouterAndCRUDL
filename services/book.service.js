import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { books } from "../books.js";

const BOOK_KEY = "bookDB";

initBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyBook,
  getEmptyReview,
  getAllBooks,
  addReview,
  getCurrencyCodes,
  addGoogleBook,
};

async function addGoogleBook(gBook) {
  const book = getGoogleBookFormat(gBook);

  await save(book, false);
  return book;
}

function getGoogleBookFormat(gBook) {
  const currencyCode = getCurrencyCodes();
  const {
    id,
    volumeInfo: {
      title,
      subtitle = "",
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks: { thumbnail, smallThumbnail },
      language,
    },
  } = gBook;

  return {
    id: id,
    title: title,
    subtitle: subtitle,
    authors: authors,
    publishedDate: publishedDate,
    description: description,
    pageCount: pageCount,
    categories: categories,
    reviews: [],
    thumbnail:
      thumbnail ||
      smallThumbnail ||
      "./assets/img/BooksImages/" + Math.ceil(Math.random() * 20) + ".jpg",
    language: language,
    listPrice: {
      amount: utilService.getRandomIntInclusive(30, 500),
      currencyCode: currencyCode[Math.floor(Math.random() * 3)],
      isOnSale: Math.random() > 0.7,
    },
  };
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, "i");
      books = books.filter((book) => regExp.test(book.title));
    }
    if (filterBy.amount) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.amount);
    }
    if (filterBy.pageCount) {
      books = books.filter((book) => book.pageCount >= filterBy.pageCount);
    }
    return books;
  });
}

async function get(bookId) {
  return await storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book, isEdit = true) {
  if (book.id && isEdit) {
    return storageService.put(BOOK_KEY, book);
  } else {
    if (book.categories && book.categories.typeof !== "object") {
      book.categories = book.categories.slice(", ");
    }
    if (!book.thumbnail)
      book.thumbnail =
        "/assets/img/BooksImages/" + Math.ceil(Math.random() * 20) + ".jpg";
    return storageService.post(BOOK_KEY, book);
  }
}

function getCurrencyCodes() {
  return ["USD", "EUR", "ILS"];
}

function getCurrencyCodeSigh(currencyCode) {
  switch (currencyCode) {
    case "ILS":
      return "₪";
    case "USD":
      return "$";
    case "EUR":
      return "€";
  }
}

function getDefaultFilter(filterBy = { title: "", price: "" }) {
  return { ...filterBy };
}

function initBooks() {
  const data = localStorage.getItem(BOOK_KEY);
  if (!data) utilService.saveToStorage(BOOK_KEY, books);
}

function getEmptyReview() {
  const emptyReview = {
    fullname: "",
    rate: 2,
    readAt: new Date(),
  };
  return emptyReview;
}

function getEmptyBook(
  thumbnail = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"
) {
  const emptyBook = {
    title: "",
    price: 0,
    description: "",
    pageCount: 0,
    publishedDate: "",
    authors: [""],
    categories: [""],
    listPrice: {
      amount: 0,
      currencyCode: "USD",
      isOnSale: false,
    },
  };
  return { ...emptyBook, thumbnail };
}

async function addReview(bookId, review) {
  await get(bookId).then((book) => {
    if (!book.reviews) book.reviews = [];
    book.reviews = [review, ...book.reviews];
    console.log(book);
    save(book);
  });
  return review;
}

function getAllBooks() {
  const books = utilService.loadFromStorage(BOOK_KEY);
  return books;
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextId = nextBook.id;
    book.prevId = prevBook.id;
    return book;
  });
}
