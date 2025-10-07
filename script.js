const myLibrary = [];

function Book() {
	this.id;
	this.title;
	this.author;
	this.pages;
	this.isRead;
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, read : ${this.isRead}`;
	};
}

function addBookToLibrary(title, author, pages, isRead) {
	let newBook = new Book();
	let randomId = crypto.randomUUID();
	newBook.id = randomId;
	newBook.title = title;
	newBook.author = author;
	newBook.pages = pages;
	newBook.isRead = isRead;
	myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary("Harry Potter and the Philosopher's stone", 'J.K. Rowling', 302, false);
addBookToLibrary('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 339, false);
addBookToLibrary('Blaise Pascal ou le Génie français', 'Jacques Attali', 524, false);
addBookToLibrary("N'ayez pas peur de la Chine", 'Phillipe Barret', 358, false);
addBookToLibrary('Manuel du Guerrier de la Lumière', 'Paulo Coelho', 113, true);

const list = document.querySelector('#book-list');

const renderLibrary = function (arr) {
	arr.forEach((book) => {
		const row = document.createElement('tr');

		const titleTd = document.createElement('td');
		titleTd.textContent = `${book.title}`;

		const authorTd = document.createElement('td');
		authorTd.textContent = `${book.author}`;

		const pagesTd = document.createElement('td');
		pagesTd.textContent = `${book.pages}`;

		const readTd = document.createElement('td');
		const inputRead = document.createElement('input');
		inputRead.type = 'checkbox';
		inputRead.checked = book.isRead;

		const deleteTd = document.createElement('td');
		const deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.textContent = 'Delete Book';
		deleteBtn.setAttribute('data-id', `${book.id}`);
		deleteBtn.addEventListener('click', (e) => {
			const bookId = e.target.dataset.id;
			const indexOfBookToDelete = myLibrary.findIndex((book) => book.id === bookId);
			myLibrary.splice(indexOfBookToDelete, 1);
			list.textContent = '';
			renderLibrary(myLibrary);
		});

		row.appendChild(titleTd);
		row.appendChild(authorTd);
		row.appendChild(pagesTd);
		readTd.appendChild(inputRead);
		row.appendChild(readTd);
		deleteTd.appendChild(deleteBtn);
		row.appendChild(deleteTd);

		list.appendChild(row);
	});
};
renderLibrary(myLibrary);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);

	const newBookTitle = formData.get('title');
	const newBookAuthor = formData.get('author');
	const newBookPages = formData.get('pages');
	const newBookRead = form.elements['read'].checked;

	addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
	list.textContent = '';
	renderLibrary(myLibrary);
	form.reset();
});
