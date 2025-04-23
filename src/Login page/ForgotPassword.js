// src/pages/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import "./Auth.css";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (!email) {
        throw new Error("Please enter your email address");
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would:
      // 1. Send email with reset link (via your backend)
      // 2. The link would contain a token like:
      //    `https://yourapp.com/reset-password?token=abc123&email=${encodeURIComponent(email)}`

      setMessage({
        type: "success",
        text: `Password reset link has been sent to ${email}. Please check your inbox.`,
      });

      // Clear form
      setEmail("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      <div className="auth-form">
        <h2>Reset Your Password</h2>

        {message && (
          <div className={`auth-message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
            <p className="hint-text">
              We'll send a password reset link to this email
            </p>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="auth-footer">
            Remember your password? <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
