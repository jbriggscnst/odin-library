
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `The ${title} by ${author}, ${pages}, ${read}.`;
    };
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    displayLibrary(myLibrary);
}

function displayLibrary(myLibrary) {
    const library = document.querySelector(".library");

    library.innerHTML= "";

    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? "Have read" : "Unread"}</p> <button class="read-status-btn">Have you read this?</button>
            <button class="rm-book-btn">Remove from Library</button>
        `;
        library.appendChild(bookCard);
    }
}

const myLibrary = []
addBookToLibrary("The Hobbit", "Tolkien", "295 pages", false);
addBookToLibrary("1984", "George Orwell", "368 pages", false);
addBookToLibrary("The Very Hungry Caterpillar", "Eric Carle", "32 pages", true)

const newBookBtn = document.querySelector("#new-book-btn");
const bookForm = document.querySelector("#book-form");
const libraryContainer = document.querySelector(".library");

newBookBtn.addEventListener("click", () => {
    bookForm.hidden = false;
});

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const bookData = new FormData(event.target);

    const title = bookData.get("title");
    const author = bookData.get("author");
    // currently receiving a string from this, Number() if needed
    const pages = bookData.get("pages");
    const read = bookData.get("readStatus") === "Have read"

    addBookToLibrary(title, author, pages, read);
})

libraryContainer.addEventListener("click", (event) => {
    const cardButton = event.target.closest("button")
    if (!cardButton) return;

    const bookCard = cardButton.closest(".book-card");
    const index = myLibrary.findIndex(
        (book) => book.id === bookCard.dataset.id
    );

    if (cardButton.matches(".rm-book-btn")) {
        myLibrary.splice(index, 1);
        displayLibrary(myLibrary);

    } else if (cardButton.matches(".read-status-btn")) {
        myLibrary[index].toggleReadStatus();
        displayLibrary(myLibrary);
    }

});

displayLibrary(myLibrary);
