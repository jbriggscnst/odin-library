
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `The ${title} by ${author}, ${pages}, ${read}.`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayLibrary(myLibrary) {
    const library = document.querySelector(".library");
    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        const bookTitle = document.createElement("h2")
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;
        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;
        const bookRead = document.createElement("p");
        bookRead.textContent = book.read;
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        library.appendChild(bookCard);
    }
}

const myLibrary = []
addBookToLibrary("The Hobbit", "Tolkien", "295 pages", "not read yet");
addBookToLibrary("1984", "George Orwell", "368 pages", "not read yet");
addBookToLibrary("The Very Hungry Caterpillar", "Eric Carle", "32 pages", "Have read")

const newBookBtn = document.querySelector("#new-book-btn");
const bookForm = document.querySelector("#book-form");

newBookBtn.addEventListener("click", () => {
    bookForm.hidden = false;
});

displayLibrary(myLibrary);
