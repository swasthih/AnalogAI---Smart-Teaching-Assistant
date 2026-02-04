
import { GoogleGenAI, Type } from "@google/genai";
import { UserLevel, ExplanationResponse } from "../types";

export const generateExplanation = async (topic: string, level: UserLevel): Promise<ExplanationResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `You are a smart teaching assistant that explains complex topics using simple real-life analogies.
  Adjust the complexity based on the user level:
  - Kid: Use very simple language, relatable toys, pets, or daily play. Focus on basic intuition.
  - Student: Use moderate complexity, school-level analogies, or common technology. Focus on conceptual understanding.
  - Expert: Use professional or technical analogies, high-level abstractions, or structural comparisons. Focus on systems and efficiency.

  Format the response strictly as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the topic "${topic}" for a ${level} level.`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          level: { type: Type.STRING },
          analogy: { type: Type.STRING, description: "A detailed real-life analogy explaining the core concept." },
          realMeaning: { type: Type.STRING, description: "The factual, literal explanation of the topic." },
          quiz: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Four plausible options for the quiz."
              },
              correctAnswer: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer"]
          }
        },
        required: ["topic", "level", "analogy", "realMeaning", "quiz"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate explanation");
  }

  return JSON.parse(response.text.trim()) as ExplanationResponse;
};
