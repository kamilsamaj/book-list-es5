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

UI.prototype.showAlert = function (msg, bgColor) {
  const msgEl = document.getElementById("msg-p");
  msgEl.innerText = msg;
  msgEl.style.backgroundColor = bgColor;
  msgEl.style.color = 'white';
  msgEl.style.display = 'block';
  msgEl.style.padding = '1.5rem';

  setTimeout(() => {
    msgEl.style.display = 'none';
  }, 2000);
};

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

    //Add book to list
    ui.addBookToList(book);
  }
  e.preventDefault();
});
