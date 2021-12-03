// Data Structures.
class Book
{
    constructor(title, author, pages, read) {
       this.title = title;
       this.author = author;
       this.pages = pages;
       this.read = read;
   }
}

class Lib 
{
    constructor() {
        this.books = [];
    }

    add(book)
    {
        this.books.push(book);
    }

    remove(title)
    {
        this.books = this.books.filter((book) => book.title != title);
    }

    bookList()
    {
        return this.books;
    }

    lastBook()
    {
        return this.books[this.libSize() - 1];
    }

    libSize()
    {
        return this.books.length;
    }

    isInLibrary(newBook)
    {
        this.books.some((book) => book.title === newBook.title)
    }
}

// Initializing varibales.
let Library = new Lib();

let submit = document.getElementById("submit");
let books = document.querySelector(".books"); // Element which holds all the book cards

// Function to insert new book details
function submitDetails()
{
    let book = getDetails();
    if (!Library.isInLibrary(book.title) && failsafe(book))
    {
        Library.add(book);
    
        addNewBook();
        clearForm();
    }
}

// Function to remove a book 
function removeBook(e)
{
    let btn = e.target;
    console.log(btn.parentNode);
    books.removeChild(btn.parentNode.parentNode);
    Library.remove(btn.parentNode.querySelector("h1").textContent);
}

// Function to change read status of a book
function readStatusChange(e)
{
    let btn = e.target;
    btn.classList.toggle("read");
    if(btn.textContent == "Read")
    btn.textContent = "Unread";
    else
    btn.textContent = "Read";
}

// Function to get data from the form
function getDetails()
{
    let book = document.getElementById("book").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("isRead").checked;
    return new Book(book, author, pages, read);
}

// Updates the Library view by adding a new book element
function addNewBook()
{
    books.appendChild(createBookNode(Library.lastBook()));
}

// Creates a new Book element to be added to the main
function createBookNode(book)
{
    let nbook = document.createElement("div");
    nbook.classList.add("book");
    
    let info = document.createElement("div");

    let title = document.createElement("h1");
    title.textContent = `${book.title}`;

    let author = document.createElement("i");
    author.textContent = `By ${book.author}`;
    
    info.appendChild(title);
    info.appendChild(author);
    nbook.appendChild(info);
    
    let pages = document.createElement("b");
    pages.textContent = `Pages: ${book.pages}`;
    nbook.appendChild(pages);
    
    let buttonbox = document.createElement("div");
    buttonbox.classList.add("buttons");

    let read = document.createElement("button");
    read.classList.add("status");
    if(book.read)
    {
        read.textContent = `Read`;
        read.classList.add("read");
    }
    else
        read.textContent = `Unread`;
    read.onclick = readStatusChange;
    
    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = `Remove`;
    remove.onclick = removeBook;
    
    buttonbox.appendChild(read);
    buttonbox.appendChild(remove);
    nbook.appendChild(buttonbox);

    return nbook;
}

// Clears the form after input
function clearForm() {
    document.getElementById("book").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
}

// Failsafe function to check if fields are not empty and pages variable is actually a number.
function failsafe(book)
{
    if(book.title == "" || book.author == "" || book.pages == "1")
    return false

    if(isNaN(parseInt(book.pages)))
    return false

    return true
}