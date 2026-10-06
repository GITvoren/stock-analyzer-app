import React, { useState, useRef, useEffect } from "react";
import "./StockTickerList.css";
import tickersInfo from '../../data/tickersInfo.json';

const defaultStocks = tickersInfo

function StockTickerList({
  stocks = defaultStocks,
  onSelect,
  disabled = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
   const viewportRef = useRef(null);
  const featuredStocks = stocks.filter(stock => stock.featured)

    useEffect(() => {
    function calculateVisibleItems() {
      if (!viewportRef.current) return;
      const itemWidth = 96 + 8;
      const viewportWidth = viewportRef.current.offsetWidth;
      setVisibleItems(Math.max(Math.floor(viewportWidth / itemWidth), 1));
    }

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, []);


  const maxIndex = Math.max(featuredStocks.length - visibleItems, 0);

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

               <div className="stock-ticker__viewport" ref={viewportRef}>
               <div
                    className="stock-ticker__track"
                    style={{
                    transform: `translateX(calc(-${currentIndex} * (96px + 8px)))`,
                    }}
               >
                    {featuredStocks.map((stock) => (
                    <button
                    key={stock.ticker}
                    type="button"
                    className="stock-ticker__item"
                    onClick={() => onSelect?.(stock.ticker)}
                    disabled={disabled}
                    aria-label={`Select ${stock.ticker}`}
                    >
                    <span className="stock-ticker__logo" aria-hidden="true">
                         {stock.logoSrc ? (
                         <img
                              src={stock.logoSrc}
                              alt="apple-logo"
                              className="stock-ticker__logo-image"
                         />
                         ) : null}
                    </span>

                    <span 
                    className="stock-ticker__info"
                    title={stock.name}
                    >
                         <span className="stock-ticker__symbol">
                         {stock.ticker}
                         </span>

                         <span className="stock-ticker__company">
                         {stock.name}
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