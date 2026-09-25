import OpenAI from 'openai';

export async function handleOpenAIRequest(request, env, corsHeaders){
     try {
          
          const { dataString, tickerNames } = await request.json();

          const openai = new OpenAI({
               apiKey: env.OPENAI_API_KEY
          })

          const response = await openai.responses.create({
               model: 'gpt-5.4-mini',
               input: [
                    {
                         role: 'system',
                         content: `You are a professional financial stock analyst.
                         Your job is to read raw historical stock data from the Polygon API and write a brief,
                         clear 3 to 5 sentence summary explaining how the stock performed over the given period.

                         Data key reference:
                         - 'o' means Opening Price
                         - 'c' means Closing Price
                         - 'h' means Highest Price of the day
                         - 'l' means Lowest Price of the day
                         - 'v' means Trading Volume

                         Identify whether the stock was on an uptrend, downtrend, or trading sideways during
                         the period (and note any clear shift between these), based only on the price data
                         given. Keep the summary concise and to the point.

                         Do not recommend whether to buy, hold, or sell. Do not speculate about future price
                         movement. Do not use sentiment language like "bullish" or "bearish." Keep your tone
                         objective and professional, focused only on describing what the historical data shows.`
                    },
                    {
                         role: 'user',
                         content: `Please analyze this raw stock data for ${tickerNames} and explain how the stock performed over this period:

                         ${dataString}`
                    }
               ]/* ,
               store: true */
          });

          const reply = response.output_text;

          return Response.json({ message: reply }, {
               headers: corsHeaders
          });
                    

     } catch (e) {
          return Response.json({ error: e.message || e }, {
			status: 500,
			headers: corsHeaders
		});
     }
}