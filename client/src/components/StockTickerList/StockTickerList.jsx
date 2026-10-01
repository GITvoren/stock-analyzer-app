import React, { useState } from "react";
import "./StockTickerList.css";

const defaultStocks = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    logoSrc: "",
  },
  {
    symbol: "TSLA",
    company: "Tesla, Inc.",
    logoSrc: "",
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    logoSrc: "",
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp.",
    logoSrc: "",
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    logoSrc: "",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    logoSrc: "",
  },
  {
    symbol: "META",
    company: "Meta Platforms",
    logoSrc: "",
  },
  {
    symbol: "NFLX",
    company: "Netflix Inc.",
    logoSrc: "",
  },
];

function StockTickerList({
  stocks = defaultStocks,
  onSelect,
  disabled = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = 4;
  const maxIndex = Math.max(stocks.length - visibleItems, 0);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrevious = () => {
    if (!canGoPrevious || disabled) return;

    setCurrentIndex((current) => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    if (!canGoNext || disabled) return;

    setCurrentIndex((current) =>
      Math.min(current + 1, maxIndex)
    );
  };

  return (
     <div className="stock-ticker-container">
          <div className="stock-ticker" aria-label="Popular stocks">
               <button
               type="button"
               className="stock-ticker__navigation"
               onClick={handlePrevious}
               disabled={disabled || !canGoPrevious}
               aria-label="View previous stocks"
               >
               <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
               </svg>
               </button>

               <div className="stock-ticker__viewport">
               <div
                    className="stock-ticker__track"
                    style={{
                    transform: `translateX(calc(-${currentIndex} * (96px + 8px)))`,
                    }}
               >
                    {stocks.map((stock) => (
                    <button
                    key={stock.symbol}
                    type="button"
                    className="stock-ticker__item"
                    onClick={() => onSelect?.(stock)}
                    disabled={disabled}
                    aria-label={`Select ${stock.symbol}`}
                    >
                    <span className="stock-ticker__logo" aria-hidden="true">
                         {stock.logoSrc ? (
                         <img
                              src={stock.logoSrc}
                              alt=""
                              className="stock-ticker__logo-image"
                         />
                         ) : null}
                    </span>

                    <span 
                    className="stock-ticker__info"
                    title={stock.company}
                    >
                         <span className="stock-ticker__symbol">
                         {stock.symbol}
                         </span>

                         <span className="stock-ticker__company">
                         {stock.company}
                         </span>
                    </span>
                    </button>
                    ))}
               </div>
               </div>

               <button
               type="button"
               className="stock-ticker__navigation"
               onClick={handleNext}
               disabled={disabled || !canGoNext}
               aria-label="View more stocks"
               >
               <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
               </svg>
               </button>
          </div>
     </div>

  );
}

export default StockTickerList;