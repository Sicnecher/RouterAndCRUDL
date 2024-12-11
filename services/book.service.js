import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { books } from "../books.js";

const BOOK_KEY = "bookDB";

initBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyBook,
  getEmptyReview,
  getAllBooks,
};

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, "i");
      books = books.filter((book) => regExp.test(book.title));
    }
    if (filterBy.amount) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.amount);
    }
    if(filterBy.pageCount){
      books = books.filter((book) => book.pageCount >= filterBy.pageCount)
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

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    const orderedBook = {
      title: book.title,
      pageCount: book.pageCount,
      description: book.description,
      thumbnail: book.thumbnail,
      listPrice: {
        amount: book.price,
        isOnSale: true,
      },
    };
    return storageService.post(BOOK_KEY, orderedBook);
  }
}

function getDefaultFilter(filterBy = { title: "", price: "" }) {
  return { ...filterBy };
}

function initBooks(){
  const data = localStorage.getItem(BOOK_KEY)
  if(!data) utilService.saveToStorage(BOOK_KEY, books);
}

function getEmptyReview(){
  const emptyReview = {
    fullname: '',
    rate: 2,
    readAt: new Date()
  }
  return emptyReview
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
  };
  return { ...emptyBook, thumbnail };
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
