import React from "react";
import { useTheme } from "../Context/ThemeContext";
import "./Home.css";

const Home = () => {
  const { theme } = useTheme();
  const featuredMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      id: 2,
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    },
  ];

  return (
    <div className={`home-page ${theme}`}>
      <section className="hero">
        <h1>Welcome to CineHub</h1>
        <p>Discover amazing movies and TV shows</p>
      </section>

      <section className="featured-movies">
        <h2>Featured Movies</h2>
        <div className="movies-grid">
          {featuredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
