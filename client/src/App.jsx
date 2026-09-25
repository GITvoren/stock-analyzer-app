import { useState } from 'react';
import './App.css'

function App() {
  const [result, setResult] = useState(null);

  async function testFetch() {
	const response = await fetch('http://localhost:8787/polygon', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			tickersArr: ['AAPL'],
			startDate: '2025-06-01',
			endDate: '2025-06-30'
		})
	});

	const data = await response.json();
	setResult(data);
}

  return (
    <>
      <h1>test</h1>
      <button onClick={testFetch}>Fetch Stock Data</button>
      <pre>{ JSON.stringify(result) }</pre>
    </>
  );
}

export default App;