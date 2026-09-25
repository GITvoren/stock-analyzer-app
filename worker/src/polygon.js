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


/* export { handlePolygonRequest }; */