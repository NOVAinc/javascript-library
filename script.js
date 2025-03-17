var formIsVisible;

const myLibrary = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: false,
  },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const shelf = document.getElementById("shelf");

function refreshLibrary() {
  shelf.innerHTML = "";

  for (bookIndex in myLibrary) {
    const book = document.createElement("tr");

    book.setAttribute("data-index", bookIndex);

    console.table(myLibrary[bookIndex]);

    book.innerHTML =
      "<td>" +
      myLibrary[bookIndex].title +
      "</td>" +
      "<td>" +
      myLibrary[bookIndex].author +
      "</td>" +
      "<td>" +
      myLibrary[bookIndex].pages +
      "</td>" +
      "<td>" +
      myLibrary[bookIndex].read +
      "</td>" +
      `<td>
        <button class="toggle-read" onclick="toggleRead(${bookIndex})">Toggle Read</button>
      </td>` +
      `<td>
        <button class="remove-book" onclick="removeBook(${bookIndex})">Remove</button>
      </td>`;
    shelf.appendChild(book);
  }
}

refreshLibrary();

function toggleForm() {
  const form = document.getElementById("book-form");
  const button = document.getElementById("add-book");

  if (formIsVisible) {
    form.style.display = "none";
    formIsVisible = false;
  } else {
    form.style.display = "block";
    formIsVisible = true;
  }
}

function toggleRead(id) {
  myLibrary[id].read = myLibrary[id].read ? false : true;

  refreshLibrary();
}

function removeBook(id) {
  myLibrary.splice(id, 1);
  refreshLibrary();
}

function clearForm() {
  const form = document.getElementById("book-form");
  form.reset();
}

function addBook() {
  const title = document.querySelector("input#title");
  const author = document.querySelector("input#author");
  const pages = document.querySelector("input#pages");
  const read = document.querySelector("input:checked");

  addBookToLibrary(title.value, author.value, pages.value, read.value);

  refreshLibrary();

  clearForm();

  toggleForm();
}
