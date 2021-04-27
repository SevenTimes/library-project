let myLibrary;
if (localStorage.getItem('myLibrary')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} else {
  myLibrary = [];
}

const table = document
  .getElementById('library')
  .getElementsByTagName('tbody')[0];
const btnAddBook = document.getElementById('addBook');

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function updateTable() {
  myLibrary.forEach((book, index) => {
    let row = table.insertRow(-1);
    for (const prop in book) {
      let newCell = row.insertCell(-1);
      let newText = document.createTextNode(book[prop]);
      newCell.appendChild(newText);
    }
    let readStatus = row.insertCell(-1);
    let readStatusBtn = document.createElement('BUTTON');
    readStatusBtn.setAttribute('class', 'readStatus');
    readStatusBtn.setAttribute('id', `data-status-${index}`);
    readStatusBtn.innerHTML = 'Change read status';
    readStatusBtn.addEventListener('click', () => {
      let readEl = table
        .querySelectorAll('tr')
        [index].querySelectorAll('td')[3];
      const r = 'read';
      const nr = 'not read';
      if (readEl.innerHTML === r) {
        readEl.innerHTML = nr;
      } else if (readEl.innerHTML === nr) {
        readEl.innerHTML = r;
      }
    });
    readStatus.appendChild(readStatusBtn);

    let delBtn = row.insertCell(-1);
    let delElement = document.createElement('BUTTON');
    delElement.setAttribute('class', 'delBtns');
    delElement.setAttribute('id', `data-${index}`);
    delElement.innerHTML = 'Delete';
    delElement.addEventListener('click', () => {
      const num = delElement.id.slice(5);
      table.deleteRow(delBtn.parentNode.rowIndex - 1);
      myLibrary.splice(num, 1);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      table.innerHTML = '';
      updateTable();
    });
    delBtn.appendChild(delElement);
  });
}

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

const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');

btnAddBook.addEventListener('click', () => {
  let status = document.querySelector('input[name="status"]:checked').value;
  let newBook = new Book(author.value, title.value, pages.value, status);
  myLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  author.value = '';
  title.value = '';
  pages.value = '';
  formPopup.style.display = 'none';
  table.innerHTML = '';
  updateTable();
});

updateTable();
