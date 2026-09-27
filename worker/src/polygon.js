// simple moving average indicator
function calculateSMA(results, period = 20) {
	if (results.length < period) return null;

	const closes = results.slice(-period).map(day => day.c);
	const sum = closes.reduce((total, price) => total + price, 0);
	return sum / period;
}

// relative strength indicator
function calculateRSI(results, period = 14) {
	if (results.length < period + 1) return null;

	const closes = results.slice(-(period + 1)).map(day => day.c);

	let gains = 0;
	let losses = 0;

	for (let i = 1; i < closes.length; i++) {
		const change = closes[i] - closes[i - 1];
		if (change > 0) {
			gains += change;
		} else {
			losses += Math.abs(change);
		}
	}

	const avgGain = gains / period;
	const avgLoss = losses / period;

	if (avgLoss === 0) return 100;

	const rs = avgGain / avgLoss;
	const rsi = 100 - (100 / (1 + rs));

	return rsi;
}


export async function handlePolygonRequest(request, env, corsHeaders) {

     		try {

			// extract tickers and dates sent from vite frontend
			const { tickersArr, startDate, endDate } = await request.json();

			if(!tickersArr || !Array.isArray(tickersArr) || tickersArr.length === 0 ) {
				return Response.json({ error: 'tickersArr must be a non-empty array' }, {
					status: 400,
					headers: corsHeaders
				})
			}

			// fetch data of tickers from polygon api
			const stockData = await Promise.all(tickersArr.map(async (ticker) => {
				const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${env.POLYGON_API_KEY}`
				
				const response = await fetch(url);

				console.log(`${ticker} status:`, response.status);

				if(response.status !== 200) return null;

				const data = await response.json();

				if (data.resultsCount === 0) return null;

				// request_id is random on every call
				// stripped this out for caching purposes later on
				delete data.request_id;

				// attach trading indicator values to data for sharper AI analysis
				const smaValue = calculateSMA(data.results);
				const rsiValue = calculateRSI(data.results);

				// preserving null if not enough history exists
				data.sma = smaValue !== null ? Math.round(smaValue * 100) / 100 : null;
				data.rsi = rsiValue !== null ? Math.round(rsiValue * 100) / 100 : null;

				return data;
			}));
			
			// filtering out empty or null market data
			const validStockData = stockData.filter(item => item !== null);

			if (validStockData.length === 0) {
				return Response.json({ error: 'No data found for the given tickers/date range' }, {
					status: 404,
					headers: corsHeaders
				})
			}

			// return clean data array back to react client
			return Response.json(validStockData, {
				headers: corsHeaders
			});
			
		} catch (e) {
		     return Response.json({ error: e.message || e }, {
				status: 500,
				headers: corsHeaders
			})
		}

}