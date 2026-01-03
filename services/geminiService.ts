import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getPlanetDetails = async (planetName: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Unable to fetch detailed AI insights.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide an educational summary for the planet ${planetName}. 
      Include 3 key sections: 
      1. Physical Characteristics (Composition, Atmosphere)
      2. Orbital Dynamics (Time to orbit Sun, Rotation)
      3. Relationship to Earth (Distance comparison, visibility).
      
      Format with clear headings. Keep the total length under 200 words. Use Markdown.`,
      config: {
        systemInstruction: "You are an expert astronomy teacher designed to explain complex space concepts to students simply and engagingly.",
      }
    });

    return response.text || "No details available.";
  } catch (error) {
    console.error("Error fetching planet details:", error);
    return "Failed to load detailed information from Gemini. Please try again later.";
  }
};