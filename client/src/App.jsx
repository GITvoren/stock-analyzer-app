import { useState } from 'react';
import StockSearchBar from '/src/components/StockSearchBar/StockSearchBar.jsx'
import StockTickerList from '/src/components/StockTickerList/StockTickerList.jsx'
import StockAnalysisContainer from '/src/components/StockAnalysisContainer/StockAnalysisContainer.jsx'
import StockChartEmptyState from '/src/components/StockChartEmptyState/StockChartEmptyState.jsx'
import ThemeToggle from '/src/components/ThemeToggle/ThemeToggle.jsx'
import Spinner from '/src/components/Spinner/Spinner.jsx'
import FinancialDisclaimer from '/src/components/FinancialDisclaimer/FinancialDisclaimer.jsx'
import Footer from '/src/components/Footer/Footer.jsx'
import OtherTickerList from '/src/components/OtherTickerList/OtherTickerList.jsx'

function App() {
  const [result, setResult] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [isTickerQueried, setIsTickerQueried] = useState(false);

  function formatDate(date) {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
}

function getLastNDays(n) {
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - n);

	return {
		startDate: formatDate(startDate),
		endDate: formatDate(endDate)
	};
}

 async function testFetch() {
	const { startDate, endDate } = getLastNDays(40);

	const response = await fetch('http://localhost:8787/polygon', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			tickersArr: ['TSLA'],
			startDate,
			endDate
		})
	});

	const data = await response.json();
	setResult(data);
}

async function testOpenAI() {
	const tickerNames = result.map(stock => stock.ticker);

	const response = await fetch('http://localhost:8787/openai', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			tickerNames,
			dataString: JSON.stringify(result)
		})
	});

	const data = await response.json();
	setAiResult(data);
}

  return (
    <>

	<div class="stock-analyzer-app-container">
		<FinancialDisclaimer />
		<ThemeToggle />
		<div className="brand-logo-container">
			<img 
			src="/clarity-brand-logo.png" 
			alt="Clarity Brand Logo" 
			className="brand-logo-light" 
			draggable="false"
			/>
			<img 
			src="/clarity-brand-logo-dark.png" 
			alt="Clarity Brand Logo" 
			className="brand-logo-dark" 
			draggable="false"
			/>
		</div>
		
	{/* 	<Spinner /> */}
		<StockSearchBar />
		<StockTickerList />
		{
			isTickerQueried ?

			<StockAnalysisContainer />

		:
			<StockChartEmptyState />
		}
		<OtherTickerList />
		<Footer />
	</div>

{/*  <button onClick={testFetch}>Fetch Stock Data</button>
      <pre>{ JSON.stringify(result) }</pre>

	<button onClick={testOpenAI}>Test OpenAI</button>
	<pre>{JSON.stringify(aiResult)}</pre> */}
    </>
  );
}

export default App;