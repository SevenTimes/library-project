let myLibrary = [];
const table = document
  .getElementById('library')
  .getElementsByTagName('tbody')[0];
const btnAddBook = document.getElementById('addBook');

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status; //read or not read yet
}

let testBook = new Book('Test', 'Me', 1, 'read');
let testBook2 = new Book('newTest', 'Also Me', 2, 'not read');
myLibrary.push(testBook, testBook2);
console.log(testBook);
console.log(myLibrary);

function updateTable() {
  myLibrary.forEach((book) => {
    let row = table.insertRow(-1);
    row.setAttribute('class', 'data-book-row');
    for (const prop in book) {
      let newCell = row.insertCell(-1);
      let newText = document.createTextNode(book[prop]);
      newCell.appendChild(newText);
    }
  });
}
updateTable();

// Popup Form

const formPopup = document.getElementById('form-popup');
const btnOpen = document.getElementById('btn-open');
const span = document.getElementsByClassName('close')[0];

btnOpen.onclick = () => (formPopup.style.display = 'block');
span.onclick = () => (formPopup.style.display = 'none');
window.onclick = function (event) {
  if (event.target == formPopup) {
    formPopup.style.display = 'none';
  }
};

// Adding books to array and table
const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');

btnAddBook.addEventListener('click', () => {
  let status = document.querySelector('input[name="status"]:checked').value;
  let newBook = new Book(author.value, title.value, pages.value, status);
  myLibrary.push(newBook);
  author.value = '';
  title.value = '';
  pages.value = '';
  formPopup.style.display = 'none';
  table.innerHTML = '';
  updateTable();
});
