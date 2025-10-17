import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import BookList from "./components/BookList";
import SingleBook from "./components/SingleBook";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <Navigation token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} />} />
      </Routes>
    </Router>
  );
}
