// For Dark and Light Mode
let body = document.querySelector("body");
let input = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");
let modeIcons = document.querySelector(".colors");
let lightModeIcon = document.querySelector(".colors #white");
let darkModeIcon = document.querySelector(".colors #black");


lightModeIcon.addEventListener("click", whiteColor);
darkModeIcon.addEventListener("click", blackColor);


function whiteColor() {
    body.style.background = "lightgray";
    lightModeIcon.style.display = "none";
    darkModeIcon.style.display = "block";
    // remove black
    input.forEach(x => {
        x.classList.remove("blackInput");
    });
    buttons.forEach(x => {
        x.classList.remove("blackBtn");
    });

}

function blackColor() {
    body.style.background = "black";
    lightModeIcon.style.display = "block";
    darkModeIcon.style.display = "none";
    input.forEach(x => {
        x.classList.add("blackInput");
    });
    buttons.forEach(x => {
        x.classList.add("blackBtn");
    });
}


// For Submit Form
// Get the Ui Element
let btnSubmit = document.getElementById('bookForm');
let bookList = document.getElementById('bookList');

// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI Class
class UI {
    static showAlert(message, className) {
        let p = document.createElement('p');
        p.className = `alert ${className}`;
        p.appendChild(document.createTextNode(message));
        let alertDiv = document.getElementById('alert');
        alertDiv.appendChild(p);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static addToBookList(book) {
        let list = document.querySelector('#bookList');
        bookList.innerHTML += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
            <a href="#" class="deleteBtn">X</a>
            </td>
        </tr>
        `;
    }
    static clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }

    static deleteBook(target) {
        if (target.hasAttribute('href')) {
            if (confirm('Are you sure!')) {
                target.parentElement.parentElement.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlert('Book removed!', 'success');
            };
        }
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBookList(book);
        });
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



// Define AddEvenListener
btnSubmit.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());
// Define Functions
function newBook(e) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;


    if (title == "" || author == "" || isbn == "") {
        UI.showAlert('Please fill all the fields!', 'error');
    } else {
        let book = new Book(title, author, isbn);
        // console.log(book);
        UI.showAlert('Book added!', 'success');
        UI.addToBookList(book);
        UI.clearFields();
        Store.addBook(book);
    }
    e.preventDefault();
}


function removeBook(e) {
    // console.log(e.target);
    UI.deleteBook(e.target);
    e.preventDefault();
}



