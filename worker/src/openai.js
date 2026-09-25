import OpenAI from 'openai';

export async function handleOpenAIRequest(request, env, corsHeaders){
     try {
          
          

     } catch (e) {
          return new Response(JSON.stringify({ error: e.message || e }), {
			status: 500,
			headers: corsHeaders
		});
     }
}