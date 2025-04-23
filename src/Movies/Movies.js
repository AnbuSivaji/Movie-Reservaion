// src/pages/Movies.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import "./Movies.css";

const Movies = () => {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        // Mock data - in real app, you would fetch from API
        const mockMovies = [
          {
            id: 1,
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 9.3,
            genre: "Drama",
            image:
              "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
            description:
              "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          },
          {
            id: 2,
            title: "The Godfather",
            year: 1972,
            rating: 9.2,
            genre: "Crime, Drama",
            image:
              "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            description:
              "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
          },
          {
            id: 3,
            title: "Pulp Fiction",
            year: 1994,
            rating: 8.9,
            genre: "Crime, Drama",
            image:
              "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            description:
              "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
        setMovies(mockMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`movies-page ${theme}`}>
      <div className="movies-header">
        <h1>Movie Collection</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-rating">{movie.rating}</div>
                </div>
                <div className="movie-details">
                  <h3>
                    {movie.title} ({movie.year})
                  </h3>
                  <p className="movie-genre">{movie.genre}</p>
                  <p className="movie-description">{movie.description}</p>
                  <button className="add-to-favorites">Add to Favorites</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No movies found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
