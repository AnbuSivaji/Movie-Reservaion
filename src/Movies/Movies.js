// src/pages/Movies.js
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../Context/ThemeContext";
import {
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "./Movies.css";

const Movies = () => {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    rating: "",
    genre: "",
    imageFile: null,
    imagePreview: "",
    description: "",
    type: "Now Showing",
    timings: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
  });
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const fileInputRef = useRef(null);

  // Theater layout
  const theaterLayout = [
    { row: "A", seats: Array(8).fill(false), price: 250, type: "Premium" },
    { row: "B", seats: Array(10).fill(false), price: 200, type: "Executive" },
    { row: "C", seats: Array(12).fill(false), price: 180, type: "Classic" },
    { row: "D", seats: Array(12).fill(false), price: 150, type: "Classic" },
    { row: "E", seats: Array(14).fill(false), price: 120, type: "Economy" },
  ];

  // Calculate total price for selected seats
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  // Handle seat selection
  const handleSeatSelection = (rowIndex, seatIndex) => {
    const seatId = `${theaterLayout[rowIndex].row}-${seatIndex + 1}`;
    const seatPrice = theaterLayout[rowIndex].price;

    setSelectedSeats((prev) => {
      const existingSeatIndex = prev.findIndex((s) => s.id === seatId);
      if (existingSeatIndex >= 0) {
        return prev.filter((_, index) => index !== existingSeatIndex);
      } else {
        return [
          ...prev,
          {
            id: seatId,
            price: seatPrice,
            row: theaterLayout[rowIndex].row,
            number: seatIndex + 1,
            type: theaterLayout[rowIndex].type,
          },
        ];
      }
    });
  };

  // Handle booking submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const bookingSummary = {
      movie: selectedMovie.title,
      time: bookingDetails.time,
      seats: selectedSeats.map((s) => `${s.row}${s.number}`).join(", "),
      total: calculateTotal(),
      ...bookingDetails,
    };

    alert(`Booking Confirmed!\n
Movie: ${bookingSummary.movie}
Time: ${bookingSummary.time}
Seats: ${bookingSummary.seats}
Total: ₹${bookingSummary.total}
Confirmation sent to: ${bookingSummary.email}`);

    // Reset
    setShowBookingModal(false);
    setSelectedSeats([]);
    setBookingDetails({
      name: "",
      email: "",
      date: "",
      time: "",
    });
  };

  // Initialize with sample movies and user data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const mockMovies = [
          {
            id: 1,
            title: "Kalki 2898 AD",
            year: 2024,
            rating: "8.5",
            genre: "Sci-Fi/Action",
            image:
              "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
            description: "Prabhas stars in this futuristic sci-fi epic.",
            type: "Now Showing",
            timings: ["10:30 AM", "2:30 PM", "6:30 PM", "10:30 PM"],
          },
          {
            id: 2,
            title: "Pushpa: The Rule",
            year: 2024,
            rating: "8.2",
            genre: "Action/Drama",
            image:
              "https://m.media-amazon.com/images/M/MV5BMTY2ODQ2NjAtZTZlMS00YThkLWE0NTYtM2JjYjVjN2FlYzVjXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg",
            description: "Sequel to the blockbuster Pushpa: The Rise.",
            type: "Now Showing",
            timings: ["11:00 AM", "3:00 PM", "7:00 PM", "11:00 PM"],
          },
        ];

        // Get user data from localStorage if available
        const userData = JSON.parse(localStorage.getItem("user")) || {};
        setBookingDetails((prev) => ({
          ...prev,
          name: userData.name || "",
          email: userData.email || "",
        }));

        await new Promise((resolve) => setTimeout(resolve, 800));
        setMovies(mockMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMovie((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle favorite
  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Add new movie
  const handleAddMovie = () => {
    const movieToAdd = {
      ...newMovie,
      id: Date.now(),
      image: newMovie.imagePreview, // Store base64 for demo (in real app, upload to server)
      timings: newMovie.timings.filter((time) => time.trim() !== ""),
    };
    setMovies((prev) => [...prev, movieToAdd]);
    setNewMovie({
      title: "",
      year: "",
      rating: "",
      genre: "",
      imageFile: null,
      imagePreview: "",
      description: "",
      type: "Now Showing",
      timings: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
    });
    setShowAddModal(false);
  };

  // Edit movie
  const handleEditMovie = () => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === editingMovie.id ? editingMovie : movie))
    );
    setShowEditModal(false);
  };

  // Delete movie
  const handleDeleteMovie = (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    }
  };

  // Timing management
  const handleAddTiming = (isNewMovie = true) => {
    if (isNewMovie) {
      setNewMovie((prev) => ({
        ...prev,
        timings: [...prev.timings, ""],
      }));
    } else {
      setEditingMovie((prev) => ({
        ...prev,
        timings: [...prev.timings, ""],
      }));
    }
  };

  const handleRemoveTiming = (index, isNewMovie = true) => {
    if (isNewMovie) {
      setNewMovie((prev) => {
        const newTimings = [...prev.timings];
        newTimings.splice(index, 1);
        return {
          ...prev,
          timings: newTimings,
        };
      });
    } else {
      setEditingMovie((prev) => {
        const newTimings = [...prev.timings];
        newTimings.splice(index, 1);
        return {
          ...prev,
          timings: newTimings,
        };
      });
    }
  };

  const handleTimingChange = (index, value, isNewMovie = true) => {
    if (isNewMovie) {
      setNewMovie((prev) => {
        const newTimings = [...prev.timings];
        newTimings[index] = value;
        return {
          ...prev,
          timings: newTimings,
        };
      });
    } else {
      setEditingMovie((prev) => {
        const newTimings = [...prev.timings];
        newTimings[index] = value;
        return {
          ...prev,
          timings: newTimings,
        };
      });
    }
  };

  // Filter movies based on search term
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`movies-page ${theme}`}>
      {/* Header and Search */}
      <div className="movies-header">
        <h1>Movie Collection</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="add-movie-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> Add Movie
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <div className="loading-spinner">Loading movies...</div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="card-actions">
                <div
                  className="favorite-icon"
                  onClick={() => toggleFavorite(movie.id)}
                >
                  {favorites.includes(movie.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="#666" />
                  )}
                </div>
                <div className="admin-actions">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => {
                      setEditingMovie({ ...movie });
                      setShowEditModal(true);
                    }}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDeleteMovie(movie.id)}
                  />
                </div>
              </div>
              <img
                src={
                  movie.image ||
                  "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>{movie.rating} ★</span>
                  <span className="movie-type">{movie.type}</span>
                </div>
                {movie.timings.length > 0 && (
                  <div className="movie-timings">
                    {movie.timings.slice(0, 2).map((time, index) => (
                      <span key={index} className="timing-badge">
                        {time}
                      </span>
                    ))}
                    {movie.timings.length > 2 && (
                      <span className="more-timings">
                        +{movie.timings.length - 2} more
                      </span>
                    )}
                  </div>
                )}
                <button
                  className="book-btn"
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowBookingModal(true);
                  }}
                  disabled={movie.type === "Coming Soon"}
                >
                  {movie.type === "Coming Soon" ? "Coming Soon" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className={`edit-modal ${theme}`}>
            <div className="modal-header">
              <h2>Add New Movie</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="form-group">
              <label>Movie Title*</label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Year*</label>
                <input
                  type="text"
                  value={newMovie.year}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, year: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input
                  type="text"
                  value={newMovie.rating}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, rating: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Genre*</label>
              <input
                type="text"
                value={newMovie.genre}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, genre: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Movie Poster*</label>
              <div className="image-upload-container">
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  Choose Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {newMovie.imagePreview && (
                  <div className="image-preview">
                    <img src={newMovie.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newMovie.description}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, description: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Type*</label>
              <select
                value={newMovie.type}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, type: e.target.value })
                }
              >
                <option value="Now Showing">Now Showing</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            {newMovie.type === "Now Showing" && (
              <div className="form-group">
                <label>Show Timings*</label>
                {newMovie.timings.map((time, index) => (
                  <div key={index} className="timing-input-group">
                    <input
                      type="text"
                      value={time}
                      onChange={(e) =>
                        handleTimingChange(index, e.target.value)
                      }
                      placeholder="HH:MM AM/PM"
                      required
                    />
                    {newMovie.timings.length > 1 && (
                      <button
                        type="button"
                        className="remove-timing-btn"
                        onClick={() => handleRemoveTiming(index)}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-timing-btn"
                  onClick={() => handleAddTiming()}
                >
                  <FaPlus /> Add Timing
                </button>
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="save-btn"
                onClick={handleAddMovie}
                disabled={
                  !newMovie.title ||
                  !newMovie.year ||
                  !newMovie.genre ||
                  !newMovie.imagePreview ||
                  (newMovie.type === "Now Showing" &&
                    newMovie.timings.some((t) => !t.trim()))
                }
              >
                Save Movie
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Movie Modal */}
      {showEditModal && editingMovie && (
        <div className="modal-overlay">
          <div className={`edit-modal ${theme}`}>
            <div className="modal-header">
              <h2>Edit Movie</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="form-group">
              <label>Movie Title*</label>
              <input
                type="text"
                value={editingMovie.title}
                onChange={(e) =>
                  setEditingMovie({ ...editingMovie, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Year*</label>
                <input
                  type="text"
                  value={editingMovie.year}
                  onChange={(e) =>
                    setEditingMovie({ ...editingMovie, year: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input
                  type="text"
                  value={editingMovie.rating}
                  onChange={(e) =>
                    setEditingMovie({ ...editingMovie, rating: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Genre*</label>
              <input
                type="text"
                value={editingMovie.genre}
                onChange={(e) =>
                  setEditingMovie({ ...editingMovie, genre: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Movie Poster</label>
              <div className="image-upload-container">
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditingMovie((prev) => ({
                          ...prev,
                          image: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div className="image-preview">
                  <img
                    src={
                      editingMovie.image ||
                      "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt="Preview"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editingMovie.description}
                onChange={(e) =>
                  setEditingMovie({
                    ...editingMovie,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Type*</label>
              <select
                value={editingMovie.type}
                onChange={(e) =>
                  setEditingMovie({ ...editingMovie, type: e.target.value })
                }
              >
                <option value="Now Showing">Now Showing</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            {editingMovie.type === "Now Showing" && (
              <div className="form-group">
                <label>Show Timings*</label>
                {editingMovie.timings.map((time, index) => (
                  <div key={index} className="timing-input-group">
                    <input
                      type="text"
                      value={time}
                      onChange={(e) =>
                        handleTimingChange(index, e.target.value, false)
                      }
                      placeholder="HH:MM AM/PM"
                      required
                    />
                    {editingMovie.timings.length > 1 && (
                      <button
                        type="button"
                        className="remove-timing-btn"
                        onClick={() => handleRemoveTiming(index, false)}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-timing-btn"
                  onClick={() => handleAddTiming(false)}
                >
                  <FaPlus /> Add Timing
                </button>
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="save-btn"
                onClick={handleEditMovie}
                disabled={
                  !editingMovie.title ||
                  !editingMovie.year ||
                  !editingMovie.genre ||
                  (editingMovie.type === "Now Showing" &&
                    editingMovie.timings.some((t) => !t.trim()))
                }
              >
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Booking Modal */}
      {showBookingModal && selectedMovie && (
        <div className="booking-modal-fullscreen">
          <div className={`booking-content-wrapper ${theme}`}>
            <div className="modal-header">
              <h2>Book Tickets for {selectedMovie.title}</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedSeats([]);
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="booking-container">
              <div className="movie-poster-section">
                <img
                  src={
                    selectedMovie.image ||
                    "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={selectedMovie.title}
                  className="booking-poster-large"
                />
                <div className="movie-info-booking">
                  <h3>{selectedMovie.title}</h3>
                  <p>
                    <strong>Genre:</strong> {selectedMovie.genre}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedMovie.rating} ★
                  </p>
                  <p>
                    <strong>Year:</strong> {selectedMovie.year}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedMovie.description}
                  </p>
                </div>
              </div>

              <div className="booking-form-section">
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date*</label>
                      <input
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Time*</label>
                      <select
                        value={bookingDetails.time}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            time: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select time</option>
                        {selectedMovie.timings.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Name*</label>
                      <input
                        type="text"
                        value={bookingDetails.name}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email*</label>
                      <input
                        type="email"
                        value={bookingDetails.email}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="seat-selection-section">
                    <h3>Select Seats</h3>
                    <div className="screen-display">SCREEN</div>

                    <div className="seat-types-info">
                      <div className="seat-type">
                        <span className="seat-sample premium"></span>
                        <span>Premium - ₹250</span>
                      </div>
                      <div className="seat-type">
                        <span className="seat-sample executive"></span>
                        <span>Executive - ₹200</span>
                      </div>
                      <div className="seat-type">
                        <span className="seat-sample classic"></span>
                        <span>Classic - ₹150-180</span>
                      </div>
                      <div className="seat-type">
                        <span className="seat-sample economy"></span>
                        <span>Economy - ₹120</span>
                      </div>
                    </div>

                    <div className="theater-layout-container">
                      {theaterLayout.map((row, rowIndex) => (
                        <div key={row.row} className="seat-row">
                          <div className="row-label">{row.row}</div>
                          <div className="seats-row">
                            {row.seats.map((seat, seatIndex) => {
                              const seatId = `${row.row}-${seatIndex + 1}`;
                              const isSelected = selectedSeats.some(
                                (s) => s.id === seatId
                              );
                              return (
                                <button
                                  key={seatIndex}
                                  type="button"
                                  className={`seat ${row.type.toLowerCase()} ${
                                    isSelected ? "selected" : ""
                                  }`}
                                  onClick={() =>
                                    handleSeatSelection(rowIndex, seatIndex)
                                  }
                                >
                                  {seatIndex + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="booking-summary">
                    <h3>Booking Summary</h3>
                    <div className="summary-details">
                      <p>
                        <strong>Movie:</strong> {selectedMovie.title}
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {bookingDetails.time || "Not selected"}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {bookingDetails.date || "Not selected"}
                      </p>
                      <p>
                        <strong>Seats:</strong>
                        {selectedSeats.length > 0
                          ? selectedSeats
                              .map((s) => `${s.row}${s.number}`)
                              .join(", ")
                          : "No seats selected"}
                      </p>
                      <p className="total-amount">
                        <strong>Total:</strong> ₹{calculateTotal()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="confirm-booking-btn"
                    disabled={
                      selectedSeats.length === 0 ||
                      !bookingDetails.time ||
                      !bookingDetails.date ||
                      !bookingDetails.name ||
                      !bookingDetails.email
                    }
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
