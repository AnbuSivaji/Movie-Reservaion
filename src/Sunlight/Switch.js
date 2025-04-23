// src/components/Sunlight/Switch.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { FaCloudSun, FaStar, FaFireAlt } from "react-icons/fa";
import "./Switch.css";

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();
    createParticles();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5,
      });
    }
    setParticles(newParticles);
  };

  return (
    <div className="theme-toggle-container">
      <button
        className={`theme-toggle ${isAnimating ? "animating" : ""}`}
        onClick={handleClick}
        aria-label="Toggle theme"
      >
        <div className={`icon-container ${theme}`}>
          <FaCloudSun className="sun-cloud" />
          <FaStar className="moon-star" />
        </div>

        {isAnimating && (
          <div className="particles-container">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${particle.x}px, ${particle.y}px)`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  color: theme === "light" ? "#ffd700" : "#4fc3f7",
                }}
              >
                {Math.random() > 0.5 ? (
                  <FaStar className="star-particle" />
                ) : (
                  <FaFireAlt className="fire-particle" />
                )}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default Switch;
