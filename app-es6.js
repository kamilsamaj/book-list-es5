class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor() {
  }

  addBookToList(book) {
    const list = document.getElementById('book-list'); // table body
    const row = document.createElement('tr');
    // insert columns to the table row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a qhref="javascript:void(0)" style="text-decoration: none" class="del-btn">X</a></td>
  `;

    // event handler for delete item button
    row.addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        e.target.parentElement.parentElement.remove();
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
      }
    });
    list.appendChild(row);
  }

  showAlert(msg, bgColor) {
    const msgEl = document.getElementById("msg-p");
    msgEl.innerText = msg;
    msgEl.style.backgroundColor = bgColor;
    msgEl.style.color = 'white';
    msgEl.style.display = 'block';
    msgEl.style.padding = '1.5rem';

    setTimeout(() => {
      msgEl.style.display = 'none';
    }, 2000);
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      const ui = new UI;

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('main-form').addEventListener('submit', e => {
  const ui = new UI();
  // form UI elements
  const title = document.getElementById('book-title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // validate inputs
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Input value is empty', 'red');
  } else {
    const book = new Book(title, author, isbn);

    // Add book to list
    ui.addBookToList(book);

    // Add book to localStorage
    Store.addBook(book);
  }
  e.preventDefault();
});
