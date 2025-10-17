import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${API_URL}/books`);
        const result = await response.json();

        console.log("API Response:", result); // You'll see it's an array!

        setBooks(result); // ✅ Fixed: result is already the array
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      <h2>Catalog</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.coverimage} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p>{book.description}</p>
              <Link to={`/books/${book.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
