// Create library object from single-use class
const myLibrary = new (class Library {
  #collection = [];
  get collection() {
    return this.#collection;
  }

  addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.collection.push(book);
  }

  addBook() {
    const title = document.querySelector("input#title");
    const author = document.querySelector("input#author");
    const pages = document.querySelector("input#pages");
    const read = document.querySelector("input:checked");

    this.addBookToLibrary(title.value, author.value, pages.value, read.value);

    displayController.refreshLibrary();

    displayController.clearForm();

    displayController.toggleForm();
  }

  removeBook(id) {
    this.collection.splice(id, 1);
    displayController.refreshLibrary();
  }

  toggleRead(id) {
    this.collection[id].read = this.collection[id].read ? false : true;

    displayController.refreshLibrary();
  }
})();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Create display controller object from sing-euse class
const displayController = new (class DisplayController {
  #formIsVisible = false;
  #shelf = document.getElementById("shelf");

  get shelf() {
    return this.#shelf;
  }

  get formIsVisible() {
    return this.#formIsVisible;
  }

  set setFormIsVisible(value) {
    this.#formIsVisible = value;
  }

  refreshLibrary() {
    this.#shelf.innerHTML = "";

    const collection = myLibrary.collection;

    for (let bookIndex in collection) {
      const book = document.createElement("tr");

      book.setAttribute("data-index", bookIndex);

      console.table(collection[bookIndex]);

      book.innerHTML =
        "<td>" +
        collection[bookIndex].title +
        "</td>" +
        "<td>" +
        collection[bookIndex].author +
        "</td>" +
        "<td>" +
        collection[bookIndex].pages +
        "</td>" +
        "<td>" +
        collection[bookIndex].read +
        "</td>" +
        `<td>
           <button class="toggle-read" onclick="myLibrary.toggleRead(${bookIndex})">Toggle Read</button>
         </td>` +
        `<td>
           <button class="remove-book" onclick="myLibrary.removeBook(${bookIndex})">Remove</button>
         </td>`;
      this.#shelf.appendChild(book);
    }
  }

  toggleForm() {
    const form = document.getElementById("book-form");
    const button = document.getElementById("add-book");

    if (displayController.formIsVisible) {
      form.style.display = "none";
      displayController.setFormIsVisible = false;
    } else {
      form.style.display = "block";
      displayController.setFormIsVisible = true;
    }
  }

  clearForm() {
    const form = document.getElementById("book-form");
    form.reset();
  }
})();

displayController.refreshLibrary();

let error = document.querySelector(".error");

let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");

// Verify the title exists
title.addEventListener("input", () => {
  if (title.checkValidity()) {
    return;
  } else {
    error.innerText = "You must fill out the title";
  }
});

// Verify the author exists
author.addEventListener("input", () => {
  if (author.checkValidity()) {
    return;
  } else {
    error.innerText = "You must fill out the author";
  }
});

// Verify pages exist and are numeric
pages.addEventListener("input", () => {
  if (pages.checkValidity()) {
    error.innerText = "";
    return;
  } else {
    error.innerText = pages.validationMessage;
  }
});
