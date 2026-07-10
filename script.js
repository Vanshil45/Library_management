function addBook() {
    const bookList = document.getElementById('book-list');
    const newBook = document.createElement('div');
    newBook.textContent = 'New Book';
    bookList.appendChild(newBook);
    alert('Book added!');
}
