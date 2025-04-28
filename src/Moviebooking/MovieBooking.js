// src/pages/MovieBooking.js
import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import "./MovieBooking.css";

const MovieBooking = () => {
  const { theme } = useTheme();
  const { id } = useParams();

  // In a real app, you would fetch movie details based on ID
  const movie = {
    id: id,
    title: "Sample Movie",
    language: "English",
    rating: 8.5,
    image: "https://via.placeholder.com/300x450",
    showTimes: ["10:00 AM", "2:00 PM", "6:30 PM", "9:00 PM"],
  };

  return (
    <div className={`booking-page ${theme}`}>
      <div className="booking-container">
        <div className="movie-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="booking-details">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span>Language: {movie.language}</span>
            <span>Rating: {movie.rating} ★</span>
          </div>

          <div className="showtimes">
            <h2>Select Showtime</h2>
            <div className="time-slots">
              {movie.showTimes.map((time, index) => (
                <button key={index} className="time-slot">
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button className="proceed-btn">Proceed to Seat Selection</button>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
