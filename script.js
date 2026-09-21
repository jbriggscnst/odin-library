const myLibrary = []

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
addBookToLibrary("The Hobbit", "Tolkien", "295 pages", "not read yet");

console.log(myLibrary[0]);