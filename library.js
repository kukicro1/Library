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
document.querySelector('button').addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    const newBook = new Book($title.value, $author.value, $pages.value, $read.checked);
    if (newBook.title === '' || newBook.author === '' || newBook.pages === '') {
        return alert('Please fill in all fields.')
    }
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

function updateLibrary() {
    bookShelf.textContent = ''
    myLibrary.forEach(element => {
        const e = myLibrary.indexOf(element)
        const div = document.createElement('div')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete Book'
        bookShelf.append(div)
        div.append(deleteButton)
        div.id = e;
        deleteButton.dataset.id = e;
        if (e === 0) {
            return div.append(myLibrary[0].title, myLibrary[0].author,
                myLibrary[0].pages, myLibrary[0].read)
        }
        else if (e >= 1) {
            return div.append(myLibrary[e].title, myLibrary[e].author,
                myLibrary[e].pages, myLibrary[e].read)
        }
    })
    deleteBook()
}

