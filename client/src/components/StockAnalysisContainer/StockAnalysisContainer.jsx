import React from "react";
import "./StockAnalysisContainer.css";
import KeyIndicators from '../KeyIndicators/KeyIndicators.jsx'
import AIInsight from '../AIInsight/AIInsight.jsx'

const StockChartCard = ({
  company,
  ticker,
  displayStartDate,
  displayEndDate,
  logoSrc,
  aiInsight,
  data,
  children,
}) => {

  function buildIndicators(data) {
	if (!data || !data.results || data.results.length === 0) return [];

	const lastDay = data.results[data.results.length - 1];
	const lastDate = new Date(lastDay.t).toLocaleDateString('en-US', {
		month: 'long', day: 'numeric', year: 'numeric'
	});

	return [
		{
			label: 'Last Close',
			value: lastDay.c.toFixed(2),
			unit: 'USD',
			date: lastDate,
			tone: 'green',
			icon: 'trend'
		},
		{
			label: '20-Day SMA',
			value: data.sma !== null ? data.sma.toFixed(2) : 'N/A',
			unit: data.sma !== null ? 'USD' : '',
			date: `As of ${lastDate}`,
			tone: 'blue',
			icon: 'average'
		},
		{
			label: '14-Day RSI',
			value: data.rsi !== null ? data.rsi.toFixed(2) : 'N/A',
			unit: '',
			date: `As of ${lastDate}`,
			tone: 'purple',
			icon: 'rsi'
		}
	];
}

function renderMarkdownBold(text) {
	const parts = text.split(/(\*\*.*?\*\*)/g);
	return parts.map((part, i) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return <strong key={i}>{part.slice(2, -2)}</strong>;
		}
		return part;
	});
}

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
            <span>{displayStartDate} – {displayEndDate}</span>
          </p>
        </div>
      </header>

        <KeyIndicators indicators={buildIndicators(data)}/>
        <AIInsight body={<p>{renderMarkdownBold(aiInsight)}</p>}/>


      {children && (
        <div className="stock-chart-card__graph">
          {children}
        </div>
      )}
    </section>
  );
};

export default StockChartCard;