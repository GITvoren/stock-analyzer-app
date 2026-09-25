import { handlePolygonRequest } from './polygon.js';
import { handleOpenAIRequest } from './openai.js';

export default {
	async fetch(request, env, ctx) {
		
		//  handle cors preflight requests so local Vite client isn't blocked by the browser
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}

		if(request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if(request.method !== 'POST'){
			return Response.json({ error: 'Method not allowed' }, {
				status: 405,
				headers: corsHeaders
			});
		}

		const url = new URL(request.url);

		if (url.pathname === '/polygon') {
			return handlePolygonRequest(request, env, corsHeaders)
		}

		if (url.pathname === '/openai') {
			return handleOpenAIRequest(request, env, corsHeaders)
		}

		return Response.json({ error: 'Not found' }, {
			status: 404,
			headers: corsHeaders
		});

	}
};