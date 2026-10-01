import React from "react";
import "./StockAnalysisContainer.css";
import KeyIndicators from '../KeyIndicators/KeyIndicators.jsx'
import AIInsight from '../AIInsight/AIInsight.jsx'

const StockChartCard = ({
  company = "Apple Inc.",
  ticker = "AAPL",
  dateRange = "Feb 14, 2025 – May 14, 2025",
  logoSrc,
  children,
}) => {
  return (
    <section className="stock-chart-card">
      <header className="stock-chart-card__header">
        <div className="stock-chart-card__logo">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${company} logo`}
              className="stock-chart-card__logo-image"
            />
          ) : (
            <span className="stock-chart-card__logo-placeholder">
              {company.charAt(0)}
            </span>
          )}
        </div>

        <div className="stock-chart-card__company">
          <h2 className="stock-chart-card__name">
            {company}
          </h2>

          <p className="stock-chart-card__metadata">
            <span>{ticker}</span>
            <span className="stock-chart-card__separator">·</span>
            <span>{dateRange}</span>
          </p>
        </div>
      </header>

        <KeyIndicators />
        <AIInsight />



      {children && (
        <div className="stock-chart-card__graph">
          {children}
        </div>
      )}
    </section>
  );
};

export default StockChartCard;