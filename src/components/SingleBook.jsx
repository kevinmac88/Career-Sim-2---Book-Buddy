import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); // ← Added
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const result = await response.json();
        console.log("Book data:", result);
        setBook(result);
        setLoading(false); // ← Added
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false); // ← Added
      }
    }

    fetchBook();
  }, [id]);

  async function handleReserve() {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: Number(id) }),
      });

      if (response.ok) {
        alert("Book reserved successfully!");
        navigate("/account");
      }
    } catch (error) {
      console.error("Error reserving book:", error);
    }
  }

  if (loading) return <p>Loading...</p>; // ← Changed
  if (!book) return <p>Error loading book.</p>; // ← Added safety check

  return (
    <div className="single-book">
      <img src={book.coverimage} alt={book.title} />
      <div className="book-details">
        <h2>{book.title}</h2>
        <p className="author">by {book.author}</p>
        <p className="description">{book.description}</p>
        <p className="availability">
          <strong>Available:</strong> {book.available ? "✅ Yes" : "❌ No"}
        </p>

        {token && book.available && (
          <button onClick={handleReserve} className="reserve-btn">
            Reserve Book
          </button>
        )}

        {!token && (
          <p className="login-message">Please log in to reserve this book.</p>
        )}

        {token && !book.available && (
          <p className="unavailable-message">
            This book is currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
}
