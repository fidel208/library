const container = document.getElementById("books-container");
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancel-btn")


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


function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach(Book => {
        const card = document.createElement("div");
        card.className = 'book-card';
        card.dataset.id = Book.id;

        card.innerHTML = `
        <h3>${Book.name}</h3>
        <p><strong>Author:</strong> <i>${Book.author}</i></p>
        <p><strong>Pages:</strong> <i>${Book.pages}</i></p>
        <p><strong>Status:</strong> <i>${Book.read ? "read" : "Not yet read"}</i></p>
        <button class="toggle-read-button">Mark as ${Book.read ? "unread" : "read"}</button>
        <button class="remove-btn">Remove</button>
        `

        container.appendChild(card);
    });
}

newBookBtn.addEventListener("click", function() {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", function() {
    bookDialog.close();
});


bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValue = document.getElementById("name");
    const name = nameValue.value;
    const authorValue = document.getElementById("author");
    const author = authorValue.value;
    const pagesValue = document.getElementById("pages");
    const pages = parseInt(pagesValue.value);
    const readValue = document.getElementById("read");
    const read = readValue.value === 'true'; 

    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
    bookForm.reset();
    bookDialog.close();

});
displayBooks();

container.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.book-card');
    if (!card) return;
    
    const bookId = card.dataset.id;
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) return;

    if (target.classList.contains('remove-btn')) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
    else if (target.classList.contains('toggle-read-button')) {
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        displayBooks();
    }
});