
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookRecommendation = async (userPrompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is looking for a book recommendation based on: "${userPrompt}". Provide a short, engaging recommendation including Title, Author, and Why they should read it. Keep it under 100 words.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "I couldn't find a recommendation right now. Try describing a mood or genre!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The library assistant is currently shelf-organizing. Please try again later.";
  }
};

export const getSmartSearch = async (query: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for information about books related to: "${query}". Provide a concise summary of the most relevant results.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    return {
      text: response.text,
      links: grounding ? grounding.map((chunk: any) => chunk.web?.uri).filter(Boolean) : []
    };
  } catch (error) {
    console.error("Search Error:", error);
    return { text: "Search failed.", links: [] };
  }
};
