function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {
}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list'); // table body
  const row = document.createElement('tr');
  // insert columns to the table row
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a qhref="javascript:void(0)" style="text-decoration: none" class="del-btn">X</a></td>
  `;

  row.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.classList.contains('del-btn')) {
      e.target.parentElement.parentElement.remove();
    }
  });
  list.appendChild(row);
};


document.getElementById('main-form').addEventListener('submit', e => {
  // form UI elements
  const title = document.getElementById('book-title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  //Add book to list
  ui.addBookToList(book);
  e.preventDefault();
});
