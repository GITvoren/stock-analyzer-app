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
import tickersInfo from './data/tickersInfo.json';

function App() {
  const [polygonResult, setPolygonResult] = useState(null);
  const [openAiResult, setOpenAiResult] = useState(null);
  const [isTickerQueried, setIsTickerQueried] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
/*   const [dateRange, setDateRange] = useState(''); */
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  const handleSearch = async () => {

	const ticker = inputValue.replace(/\s+/g, '').toUpperCase();
	if(!ticker) return;

	setIsLoading(true);
	setErrorMessage(null);
	setIsTickerQueried(false);

	const { startDate, endDate } = getLastNDays(40);

setStartDate(new Date(startDate.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
setEndDate(new Date(endDate.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));

/* 	setDateRange(
  `${new Date(startDate.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${new Date(endDate.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
); */

     const polygonResponse = await fetch('http://localhost:8787/polygon', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			tickersArr: [ticker],
			startDate,
			endDate
		})
	});
	const polygonData = await polygonResponse.json();

	if (polygonResponse.status === 429) {
		setErrorMessage('Free data plan limit: 5 requests per minute. Please wait a moment before searching again.');
		setIsLoading(false);
		return;
	}

	if (!polygonResponse.ok || polygonData.length === 0) {
		setErrorMessage(`No data found for "${ticker}". Check the ticker and try again.`);
		setIsLoading(false);
		return;
	}

	console.log(polygonData)
	setPolygonResult(polygonData);

	const tickerNames = [polygonData[0].ticker];

	const openaiResponse = await fetch('http://localhost:8787/openai', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		tickerNames,
		dataString: JSON.stringify(polygonData)
	})
});

	const openaiData = await openaiResponse.json();

	if (!openaiResponse.ok) {
	setErrorMessage('Could not generate AI analysis. Please try again.');
	setIsLoading(false);
	return;
}
	console.log(openaiData)
	setOpenAiResult(openaiData);
	setIsTickerQueried(true);
	setIsLoading(false);


  }

  function getCompanyInfo(ticker) {
	const match = tickersInfo.find(stock => stock.ticker === ticker);
	return {
		name: match ? match.name : ticker,
		logoSrc: match ? match.logoSrc : undefined
	};
}

	const companyInfo = polygonResult ? getCompanyInfo(polygonResult[0].ticker) : null;

  return (
    <>

	<div className="stock-analyzer-app-container">
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
		

		<StockSearchBar
		inputValue = {inputValue}
		setInputValue = {setInputValue}
		onSearch = {handleSearch}
		 />
		<StockTickerList onSelect={ ticker => setInputValue(ticker)} />

		{
			isLoading ? (
				<div className="spinner-container">
					<Spinner />
				</div>
			) : isTickerQueried ? (

			<StockAnalysisContainer
			 ticker={polygonResult[0].ticker}
			 company={companyInfo.name}
			 logoSrc={companyInfo.logoSrc}
			 data={polygonResult[0]}
			 startDate={startDate}
			 endDate={endDate}
			 aiInsight={openAiResult.message}
			 />

		) : (
			 <StockChartEmptyState />
		)}

		<OtherTickerList />
		<Footer />
	</div>


    </>
  );
}

export default App;