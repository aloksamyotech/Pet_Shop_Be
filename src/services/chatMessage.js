import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_API_KEY });

export const sendMessage = async (req) => {
  const { message } = req.body;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: message,
  });
  return (response.text);
};
