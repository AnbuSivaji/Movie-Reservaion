// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Login from "./Login page/Login .js";
import Signup from "./Login page/SignUp.js";
import Movies from "./Movies/Movies";
import MovieBooking from "./Moviebooking/MovieBooking.js";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id/book" element={<MovieBooking />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
