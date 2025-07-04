
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], userLevel } = await req.json();

    // Build the conversation context
    let systemPrompt = `You are a helpful DSA (Data Structures and Algorithms) Assistant. You specialize in helping users learn and understand data structures and algorithms concepts. 

Key guidelines:
- Provide clear, educational explanations
- Use examples and analogies when helpful
- Suggest practice problems when appropriate
- If asked about non-DSA topics, politely redirect to DSA-related discussions
- Be encouraging and supportive for learners at all levels`;

    if (userLevel) {
      systemPrompt += `\n- The user's skill level is: ${userLevel}. Adjust your explanations accordingly.`;
    }

    // Build conversation history for context
    const messages = [
      { role: 'user', parts: [{ text: systemPrompt }] }
    ];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      if (msg.type === 'user') {
        messages.push({ role: 'user', parts: [{ text: msg.content }] });
      } else if (msg.type === 'assistant') {
        messages.push({ role: 'model', parts: [{ text: msg.content }] });
      }
    });

    // Add current message
    messages.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
