let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const $title = document.querySelector('#title')
const $author = document.querySelector('#author')
const $pages = document.querySelector('#number')
const $read = document.querySelector('#read')
const form = document.querySelector('form')
const bookShelf = document.querySelector('#showBook')
const submit = document.querySelector('button')

submit.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    const newBook = new Book($title.value, $author.value, $pages.value, $read.checked);
    if (!$title.checkValidity() || !$author.checkValidity() ||
        !$pages.checkValidity()) {
        submit.preventDefault()
    }
    // if (newBook.title === '' || newBook.author === '' || newBook.pages === '') {
    //     return alert('Please fill in all fields.')
    // }
    else {
        myLibrary.push(newBook)
        form.reset()
    }
    updateLibrary()
}

function deleteBook() {
    const buttons = document.querySelectorAll('[data-id]')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id
            const div = document.getElementById(id)
            const answer = confirm(`Are you sure you want to delete ${myLibrary[id].title} book?`)
            if (answer === true) {
                myLibrary.splice(id, 1);
                div.remove();
                return updateLibrary();
            }
            else return
        })
    })
}

function updateLibrary() { //Update nested div and myLibrary array
    bookShelf.textContent = ''
    myLibrary.forEach(element => {
        const e = myLibrary.indexOf(element)
        const bookDiv = document.createElement('div')
        const titleDiv = document.createElement('div')
        const authorDiv = document.createElement('div')
        const readDiv = document.createElement('div')
        const pagesDiv = document.createElement('div')
        const deleteButton = document.createElement('button')
        const readStatus = document.createElement('input')
        readStatus.setAttribute('type', 'checkbox')
        readStatus.checked = myLibrary[e].read
        titleDiv.className = 'titleDiv'
        authorDiv.className = 'authorDiv'
        readDiv.className = 'readDiv'
        pagesDiv.className = 'pagesDiv'
        deleteButton.textContent = 'Delete Book'
        bookShelf.append(bookDiv)
        bookDiv.append(titleDiv, authorDiv, pagesDiv, readDiv, deleteButton)
        bookDiv.id = e;
        readStatus.dataset.checkId = e;
        deleteButton.dataset.id = e;
        if (e === 0) {
            return (
                titleDiv.append(myLibrary[0].title),
                authorDiv.append(myLibrary[0].author),
                pagesDiv.append(myLibrary[0].pages),
                readDiv.append(readStatus)
            );
        }
        else if (e >= 1) {
            return (
                titleDiv.append(myLibrary[e].title),
                authorDiv.append(myLibrary[e].author),
                pagesDiv.append(myLibrary[e].pages),
                readDiv.append(readStatus)
            );
        }
    })
    deleteBook()
    readBook()
}

function readBook() { //Check read status of the book
    const checkbox = document.querySelectorAll('[data-check-id]')
    checkbox.forEach(check => {
        check.addEventListener('change', () => {
            const id = check.dataset.checkId
            const checkValue = check.checked
            myLibrary[id].read = checkValue
        })
    })
}