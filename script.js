const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
    new Book("Dune", "Frank Herbert", 412, false),
    new Book("1984", "George Orwell", 328, true)
];

function Book(name, author, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages. read);
    myLibrary.push(newBook);
    return newBook;
}

function displayBooks() {
    const container = document.getElementById("books-container");

    myLibrary.forEach(Book => {
        const card = document.createElement("div");
        card.className = 'book-card';
        card.dataset.id = Book.id;

        card.innerHTML = `
        <h3>${Book.name}</h3>
        <p>Author: ${Book.author}</p>
        <p>Pages: ${Book.pages}</p>
        <p>Status: ${Book.read ? "read" : "Not yet read"}</p>
        <button class="toggle-read-button">Mark as ${Book.read ? "read" : "unread"}</button>
        <button class="remove-btn">Remove</button>
        `

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", displayBooks);