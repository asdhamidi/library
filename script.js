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
let books = document.querySelector(".books");
let remove = document.querySelectorAll(".remove");
let readStatus = document.querySelectorAll(".status");

// Event Listeners
submit.addEventListener("click", submitDetails);

// Function to insert new book details
function submitDetails()
{
    let book = getDetails();
    if (!Library.isInLibrary(book.title) && failsafe(book))
    {
        Library.add(book);
    
        addNewBook();
        clearForm();
        updateButtons();
    }
}

// Function to remove a book 
function removeBook(e)
{
    let btn = e.target;
    console.log(btn.parentNode);
    books.removeChild(btn.parentNode);
    Library.remove(btn.parentNode.querySelector("h1").textContent);
    updateButtons();
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
    updateButtons();
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

// Updates
function addNewBook()
{
    let booklist = Library.bookList();
    books.appendChild(createBookNode(booklist[booklist.length - 1]));
}

function createBookNode(book)
{
    let nbook = document.createElement("div");
    nbook.classList.add("book");

    let title = document.createElement("h1");
    title.textContent = `${book.title}`;
    nbook.appendChild(title);
    
    let author = document.createElement("i");
    author.textContent = `By ${book.author}`;
    nbook.appendChild(author);

    let pages = document.createElement("b");
    pages.textContent = `Pages: ${book.pages}`;
    nbook.appendChild(pages);

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
    nbook.appendChild(read);
    
    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = `Remove`;
    remove.onclick = removeBook;
    nbook.appendChild(remove);
    

    return nbook;
}

function clearForm() {
    document.getElementById("book").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("isRead").checked = false;
}

function updateButtons () {
    remove = document.querySelectorAll(".remove");
    readStatus = document.querySelectorAll(".status");
}

function failsafe(book)
{
    if(book.title == "" || book.author == "" || book.pages == "1")
    return false

    if(isNaN(parseInt(book.pages)))
    return false

    return true
}