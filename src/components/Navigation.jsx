import { Link } from "react-router-dom";

export default function Navigation({ token, setToken }) {
  return (
    <nav>
      <h1>📚 Book Buddy</h1>
      <div>
        <Link to="/">Books</Link>
        {token ? (
          <>
            <Link to="/account">Account</Link>
            <button onClick={() => setToken(null)}>Log out</button>
          </>
        ) : (
          <Link to="/account">Log in</Link>
        )}
      </div>
    </nav>
  );
}
