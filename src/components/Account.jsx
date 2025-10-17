import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Account({ token }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        console.log("User data:", result);
        setUser(result);
        setReservations(result.reservations || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReservations(reservations.filter((r) => r.id !== reservationId));
        alert("Book returned successfully!");
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return (
      <div className="auth-container">
        <h2>Account</h2>
        <p>Please log in or register to view your account.</p>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  if (!user) return <p>Error loading user data.</p>;

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <div className="user-info">
        <p>
          <strong>Name:</strong> {user.firstname} {user.lastname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h3>My Reservations</h3>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              {reservation.coverimage && (
                <img src={reservation.coverimage} alt={reservation.title} />
              )}
              <div className="reservation-details">
                <h4>{reservation.title}</h4>
                <p>by {reservation.author}</p>
                <button
                  onClick={() => handleReturn(reservation.id)}
                  className="return-btn"
                >
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
