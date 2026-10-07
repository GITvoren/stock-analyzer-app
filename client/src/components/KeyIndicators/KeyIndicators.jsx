import React from "react";
import "./KeyIndicators.css";

/* const defaultIndicators = [
  {
    label: "Last Close",
    value: "198.53",
    unit: "USD",
    date: "May 14, 2025",
    tone: "green",
    icon: "trend",
  },
  {
    label: "20-Day SMA",
    value: "200.21",
    unit: "USD",
    date: "As of May 14, 2025",
    tone: "blue",
    icon: "average",
  },
  {
    label: "14-Day RSI",
    value: "47.38",
    unit: "",
    date: "As of May 14, 2025",
    tone: "purple",
    icon: "rsi",
  },
];
 */
function IndicatorIcon({ type }) {
  if (type === "trend") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3.5 3v13h13" />
        <path d="M5.5 12.5 9 9l2.5 2 4-5" />
      </svg>
    );
  }

  if (type === "average") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 13.5 8 9.5l3 2 5-5" />
        <path d="M13.5 6.5H16v2.5" />
      </svg>
    );
  }

  if (type === "rsi") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3.5 10c2.2-6 4.1 6 6.3 0s4.1-6 6.7 0" />
      </svg>
    );
  }

  return null;
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 7.1v3.2" />
      <circle cx="8" cy="4.9" r=".55" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function KeyIndicators({
  indicators,
  onIndicatorClick,
}) {
  return (
    <section className="key-indicators" aria-labelledby="key-indicators-title">
      <h2 id="key-indicators-title" className="key-indicators__title">
        Key Indicators
      </h2>

      <div className="key-indicators__grid">
        {indicators.map((indicator) => (
          <div
            className="indicator-card"
            key={`${indicator.label}-${indicator.value}`}
          >
            <div className="indicator-card__header">
              <span className="indicator-card__label">
                {indicator.label}
              </span>

              <span
                className={`indicator-card__icon indicator-card__icon--${indicator.tone}`}
                aria-hidden="true"
              >
                <IndicatorIcon type={indicator.icon} />
              </span>
            </div>

            <div className="indicator-card__value-row">
              <span className="indicator-card__value">
                {indicator.value}
              </span>

              {indicator.unit && (
                <span className="indicator-card__unit">
                  {indicator.unit}
                </span>
              )}
            </div>

            <span className="indicator-card__date">{indicator.date}</span>
          </div>
        ))}
      </div>

      <div className="key-indicators__note">
        <InfoIcon />
        <span>Indicators are calculated based on historical daily closing prices.</span>
      </div>
    </section>
  );
}