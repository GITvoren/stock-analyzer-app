import React from "react";
import "./StockChartEmptyState.css";

const StockChartEmptyState = () => {
  return (
    <section className="stock-chart-empty-state">
      <div className="stock-chart-empty-state__content">
        <div className="stock-chart-empty-state__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 17L9 12L13 15L20 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 7H20V11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="stock-chart-empty-state__title">
          Search for a stock to get started
        </h2>

        <p className="stock-chart-empty-state__description">
          Enter a ticker symbol above to view its price and market analysis.
        </p>
      </div>
    </section>
  );
};

export default StockChartEmptyState;