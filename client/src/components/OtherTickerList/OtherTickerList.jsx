import { useMemo, useState } from 'react';
import './OtherTickerList.css';

const tickers = [
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'AMZN', name: 'Amazon' },
  { ticker: 'META', name: 'Meta Platforms' },
  { ticker: 'NFLX', name: 'Netflix' },
  { ticker: 'DIS', name: 'Disney' },
  { ticker: 'KO', name: 'Coca-Cola' },
  { ticker: 'NKE', name: 'Nike' },
  { ticker: 'SBUX', name: 'Starbucks' },
  { ticker: 'MCD', name: "McDonald's" },
  { ticker: 'WMT', name: 'Walmart' },
  { ticker: 'PEP', name: 'PepsiCo' },
  { ticker: 'COST', name: 'Costco' },
  { ticker: 'HD', name: 'Home Depot' },
  { ticker: 'TGT', name: 'Target' },
  { ticker: 'CMG', name: 'Chipotle' },
  { ticker: 'LLY', name: 'Eli Lilly' },
  { ticker: 'JNJ', name: 'Johnson & Johnson' },
  { ticker: 'PFE', name: 'Pfizer' },
  { ticker: 'PG', name: 'Procter & Gamble' },
  { ticker: 'V', name: 'Visa' },
  { ticker: 'MA', name: 'Mastercard' },
  { ticker: 'PYPL', name: 'PayPal' },
  { ticker: 'BAC', name: 'Bank of America' },
  { ticker: 'JPM', name: 'JPMorgan Chase' },
  { ticker: 'SNE', name: 'Sony' },
  { ticker: 'UBER', name: 'Uber' },
  { ticker: 'ABNB', name: 'Airbnb' },
  { ticker: 'SPOT', name: 'Spotify' },
  { ticker: 'EBAY', name: 'eBay' },
  { ticker: 'F', name: 'Ford' },
  { ticker: 'GM', name: 'General Motors' },
  { ticker: 'RACE', name: 'Ferrari' },
  { ticker: 'DAL', name: 'Delta Air Lines' },
  { ticker: 'MAR', name: 'Marriott' },
  { ticker: 'ORCL', name: 'Oracle' },
  { ticker: 'AMD', name: 'Advanced Micro Devices' },
];

const PAGE_SIZE = 12;

function TickerList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tickers.length / PAGE_SIZE);

  const currentTickers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return tickers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage]);

  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(
    currentPage * PAGE_SIZE,
    tickers.length
  );

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  };

  return (
    <section
      className="ticker-list"
      aria-label="Stock tickers"
    >
      <div className="ticker-list__header">
        <div>
          <h2 className="ticker-list__title">
            Tickers
          </h2>

          <p className="ticker-list__description">
            Browse other stocks and companies.
          </p>
        </div>

        <span className="ticker-list__count">
          {tickers.length} tickers
        </span>
      </div>

      <div className="ticker-list__grid">
        <div className="ticker-list__column-header">
          <span className="ticker-list__label">
            TICKER
          </span>

          <span className="ticker-list__label">
            COMPANY
          </span>
        </div>

        <div className="ticker-list__column-header unshow">
          <span className="ticker-list__label">
            TICKER
          </span>

          <span className="ticker-list__label">
            COMPANY
          </span>
        </div>

        {currentTickers.map((item) => (
          <div
            className="ticker-list__item"
            key={item.ticker}
          >
            <span className="ticker-list__ticker">
              {item.ticker}
            </span>

            <span className="ticker-list__name">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="ticker-list__footer">
        <span className="ticker-list__range">
          Showing {startItem}–{endItem} of {tickers.length}
        </span>

        <nav
          className="ticker-pagination"
          aria-label="Ticker pagination"
        >
          <button
            type="button"
            className="ticker-pagination__button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="ticker-pagination__pages">
            {Array.from(
              { length: totalPages },
              (_, index) => {
                const page = index + 1;

                return (
                  <button
                    type="button"
                    className={`ticker-pagination__page ${
                      page === currentPage
                        ? 'ticker-pagination__page--active'
                        : ''
                    }`}
                    key={page}
                    onClick={() => goToPage(page)}
                    aria-current={
                      page === currentPage
                        ? 'page'
                        : undefined
                    }
                  >
                    {page}
                  </button>
                );
              }
            )}
          </div>

          <button
            type="button"
            className="ticker-pagination__button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}

export default TickerList;