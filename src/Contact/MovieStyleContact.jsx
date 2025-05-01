import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import {
  FaFilm,
  FaTicketAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./MovieStyleContact.css";

const MovieStyleContact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "general",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thanks for your message, ${formData.name}! Our team will respond soon.`
    );
    setFormData({
      name: "",
      email: "",
      inquiry: "general",
      message: "",
    });
  };

  return (
    <div className={`movie-contact ${theme}`}>
      <div className="movie-contact-header">
        <FaFilm className="film-icon" />
        <h1>Reel Connections</h1>
        <p>Contact our cinema team for any movie-related inquiries</p>
      </div>

      <div className="movie-contact-container">
        <div className="contact-methods">
          <div className="method-card">
            <div className="icon-box ticket">
              <FaTicketAlt />
            </div>
            <h3>Ticket Support</h3>
            <p>boxoffice@moviereel.com</p>
            <p>(555) 123-4567</p>
          </div>

          <div className="method-card">
            <div className="icon-box location">
              <FaMapMarkerAlt />
            </div>
            <h3>Our Theaters</h3>
            <p>123 Cinema Avenue</p>
            <p>Movie City, MC 12345</p>
          </div>

          <div className="method-card">
            <div className="icon-box envelope">
              <FaEnvelope />
            </div>
            <h3>General Inquiries</h3>
            <p>info@moviereel.com</p>
            <p>(555) 987-6543</p>
          </div>
        </div>

        <form className="movie-contact-form" onSubmit={handleSubmit}>
          <h2>
            <span>📽️</span> Send Us a Reel Message
          </h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <select
              value={formData.inquiry}
              onChange={(e) =>
                setFormData({ ...formData, inquiry: e.target.value })
              }
            >
              <option value="general">General Inquiry</option>
              <option value="tickets">Ticket Issues</option>
              <option value="suggestions">Movie Suggestions</option>
              <option value="partnerships">Business Partnerships</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message <span className="action-arrow">→</span>
          </button>
        </form>
      </div>

      <div className="movie-quote">
        <p>"The cinema is a mirror by which we often see ourselves."</p>
        <p className="quote-author">- Alejandro González Iñárritu</p>
      </div>
    </div>
  );
};

export default MovieStyleContact;
