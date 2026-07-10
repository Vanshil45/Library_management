import { useState, useEffect } from 'react';
import axios from 'axios';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 p-2 border rounded"
      />
      <ul className="mt-4">
        {filteredBooks.map(book => (
          <li key={book.id} className="border-b py-2">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">ISBN: {book.isbn}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookCatalog;
