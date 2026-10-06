import React from "react";
import "./StockSearchBar.css";

function StockSearchBar({
  onSearch,
  inputValue,
  setInputValue,
  placeholder = "Search ticker (e.g., AAPL)",
  disabled = false,
  name = "ticker-search",
  id = "ticker-search",
}) {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="stock-search">
      <input
        id={id}
        name={name}
        type="search"
        value={inputValue}
        onChange={ e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-label={placeholder}
      />
      
      <button 
        type="button" 
        className="stock-search__button" 
        onClick={onSearch}
        aria-label="Search"
      >
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
      </button>
    </div>
  );
}

export default StockSearchBar;