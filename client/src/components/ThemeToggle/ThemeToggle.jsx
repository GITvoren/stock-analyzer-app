import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleToggle = () => {
    setIsDark((current) => !current);
  };

  return (
    <div className="theme-toggle-container">
      <button
        type="button"
        className={`theme-toggle ${isDark ? "theme-toggle--dark" : ""}`}
        onClick={handleToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="theme-toggle__track">
          <span className="theme-toggle__thumb">
            {isDark ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5A8.5 8.5 0 1 0 20.5 15.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        </span>
      </button>
    </div>

  );
};

export default ThemeToggle;