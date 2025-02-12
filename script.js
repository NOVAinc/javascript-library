var visibleForm;

const myLibrary = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: false,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const shelf = document.getElementById("shelf");

for (entry of myLibrary) {
  const book = document.createElement("tr");

  console.table(entry);

  book.innerHTML =
    "<td>" +
    entry.title +
    "</td>" +
    "<td>" +
    entry.author +
    "</td>" +
    "<td>" +
    entry.pages +
    "</td>" +
    "<td>" +
    entry.read +
    "</td>";
  shelf.appendChild(book);
}

function addBookHandler() {
  const form = document.getElementById("book-form");
  const button = document.getElementById("add-book");

  if (visibleForm) {
    // GET BOOK DATA
    form.style.display = "none";
    visibleForm = false;
  } else {
    form.style.display = "block";
    visibleForm = true;
  }
}
