import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

// We'll use the Flash model for responsiveness and Search grounding
const MODEL_NAME = 'gemini-2.5-flash';

export const generateAIResponse = async (
  query: string,
  history: ChatMessage[]
): Promise<ChatMessage> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return {
      role: 'model',
      text: "Configuration Error: API_KEY is missing in the environment. Please set it to use the AI Tutor.",
      timestamp: Date.now()
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Convert internal history format to API format if needed,
  // but for simple single-turn grounded search, we might just use the query context.
  // However, let's maintain a bit of chat structure.
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Context: You are an expert Monday.com Development Tutor. Help the student with their question using the latest documentation found via search.
            
            Student Question: ${query}` }
          ]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a helpful, encouraging, and technical Monday.com expert tutor. Provide code snippets if relevant. Always cite your sources.",
      }
    });

    const candidate = response.candidates?.[0];
    const text = response.text || "I couldn't find an answer to that. Please try rephrasing.";
    
    // Extract grounding metadata (sources)
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks
      ?.filter(chunk => chunk.web?.uri && chunk.web?.title)
      .map(chunk => ({
        title: chunk.web!.title!,
        uri: chunk.web!.uri!
      })) || [];
      
    // Deduplicate sources based on URI
    const uniqueSources = Array.from(
      new Map(sources.map(item => [item.uri, item] as [string, { title: string; uri: string }])).values()
    );

    return {
      role: 'model',
      text,
      sources: uniqueSources,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      role: 'model',
      text: "Sorry, I encountered an error while searching for that information.",
      timestamp: Date.now()
    };
  }
};