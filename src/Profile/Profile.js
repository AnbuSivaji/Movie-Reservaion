// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import "./Profile.css";

const Profile = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data from localStorage
        const data = localStorage.getItem("userData");
        if (!data) {
          navigate("/login");
          return;
        }

        // Simulate fetching favorites
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUserData(JSON.parse(data));

        // Mock favorites data
        setFavorites([
          { id: 1, title: "The Shawshank Redemption", year: 1994 },
          { id: 2, title: "The Godfather", year: 1972 },
        ]);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className={`profile-loading ${theme}`}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className={`profile-page ${theme}`}>
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>

      <div className="profile-content">
        <div className="user-info">
          <div className="avatar">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="details">
            <h2>{userData?.name || "User"}</h2>
            <p className="email">{userData?.email || "user@example.com"}</p>
            <p className="member-since">Member since: January 2023</p>
          </div>
        </div>

        <div className="favorites-section">
          <h3>Your Favorite Movies ({favorites.length})</h3>
          {favorites.length > 0 ? (
            <ul className="favorites-list">
              {favorites.map((movie) => (
                <li key={movie.id} className="favorite-item">
                  <span className="movie-title">{movie.title}</span>
                  <span className="movie-year">({movie.year})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-favorites">You haven't added any favorites yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
