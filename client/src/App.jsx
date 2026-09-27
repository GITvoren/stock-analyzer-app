import { useState } from 'react';
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  function formatDate(date) {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
}

function getLast30Days() {
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - 30);

	return {
		startDate: formatDate(startDate),
		endDate: formatDate(endDate)
	};
}

 async function testFetch() {
	const { startDate, endDate } = getLast30Days();

	const response = await fetch('http://localhost:8787/polygon', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			tickersArr: ['V'],
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
      <h1>test</h1>
      <button onClick={testFetch}>Fetch Stock Data</button>
      <pre>{ JSON.stringify(result) }</pre>

	<button onClick={testOpenAI}>Test OpenAI</button>
	<pre>{JSON.stringify(aiResult)}</pre>
    </>
  );
}

export default App;