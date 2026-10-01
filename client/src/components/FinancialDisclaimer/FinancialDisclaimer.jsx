import React, { useState } from "react";
import "./FinancialDisclaimer.css";

export default function FinancialDisclaimer({
  onDismiss
}) {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) {
    return null;
  }

  return (
    <aside
      className="financial-disclaimer"
      role="note"
      aria-label="Financial disclaimer"
    >
      <div className="financial-disclaimer__warning" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d="M10 2.75 18 17H2L10 2.75Z" />
          <path d="M10 7v4" />
          <circle
            cx="10"
            cy="13.75"
            r=".65"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>

      <div className="financial-disclaimer__content">
          <strong>NOT FINANCIAL ADVICE (NFA)</strong> This tool is for informational and educational purposes only. It explains historical data and <strong>does not predict future prices.</strong>
      </div>

      <button
        type="button"
        className="financial-disclaimer__close"
        onClick={handleDismiss}
        aria-label="Dismiss financial disclaimer"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
        </svg>
      </button>
    </aside>
  );
}