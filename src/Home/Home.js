import React, { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { FaPlay, FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured movies for slider
  const featuredMovies = [
    {
      id: 1,
      title: "Kalki 2898 AD",
      language: "Telugu",
      rating: 8.5,
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    },
    {
      id: 2,
      title: "Pushpa: The Rise",
      language: "Telugu",
      rating: 8.2,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTY2ODQ1NzgtYmFjNS00YjA1LTg3MjItYzYyYTM5NDI3N2FiXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg",
    },
    {
      id: 3,
      title: "RRR",
      language: "Telugu",
      rating: 8.0,
      image:
        "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    },
  ];

  // All language movies for grid
  const allMovies = [
    {
      id: 4,
      title: "KGF Chapter 2",
      language: "Kannada",
      rating: 8.4,
      image:
        "https://m.media-amazon.com/images/M/MV5BMjMwMDgyOGQtMWZjNC00MDUwLTllZDYtZWM3NDBmN2YzNGZmXkEyXkFqcGdeQXVyMTQzNjkzMzEw._V1_.jpg",
    },
    {
      id: 5,
      title: "Vikram",
      language: "Tamil",
      rating: 8.7,
      image:
        "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 6,
      title: "Drishyam 2",
      language: "Malayalam",
      rating: 8.9,
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQvsD1lnZFgCjU0ak33bw8kkkSrKCMSGM1B1LuiLcH_MIHkXKoH",
    },
    {
      id: 7,
      title: "Jawan",
      language: "Hindi",
      rating: 8.1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8fxJgOk6Q4UGjmsa1q3CQ1Q05Lt0Dn1leAl6_KexCEjqJAe6",
    },
    {
      id: 8,
      title: "Kantara",
      language: "Kannada",
      rating: 9.0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-WKnsOp7YBra7WsdhX8TyXV3Xdz2tTaMbCFzcTx_0C82U4go",
    },
    {
      id: 9,
      title: "Ponniyin Selvan",
      language: "Tamil",
      rating: 8.3,
      image:
        "https://en.wikipedia.org/wiki/Ponniyin_Selvan:_I#/media/File:Ponniyin_Selvan_I.jpg",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredMovies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}/book`);
  };

  return (
    <div className={`home-page ${theme}`}>
      {/* Featured Movies Slider */}
      <section className="featured-slider">
        <div className="slider-container">
          <button className="slider-nav prev" onClick={prevSlide}>
            <FaArrowLeft />
          </button>

          <div
            className="slider-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="slide"
                style={{ backgroundImage: `url(${movie.image})` }}
              >
                <div className="slide-content">
                  <h2>{movie.title}</h2>
                  <div className="movie-meta">
                    <span>{movie.language}</span>
                    <span>
                      <FaStar /> {movie.rating}
                    </span>
                  </div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav next" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* All Language Movies Grid */}
      <section className="all-movies">
        <h2>Movies in All Languages</h2>
        <div className="movies-grid">
          {allMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span>{movie.language}</span>
                  <span>
                    <FaStar /> {movie.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
