import React from "react";
import "./StockSearchBar.css";

function StockSearchBar({
  value,
  onChange,
  placeholder = "Search ticker (e.g., AAPL)",
  disabled = false,
  name = "ticker-search",
  id = "ticker-search",
}) {
  return (
    <div className="stock-search">
      <input
        id={id}
        name={name}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-label={placeholder}
      />
      
      <svg
        className="stock-search__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="10.8"
          cy="10.8"
          r="6.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 16l5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default StockSearchBar;