import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_API_KEY });

export const sendMessage = async (req) => {
  try {
    const { message } = req.body;
 if (!message) throw new Error("Message content is required!")
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(message);

    const reply = result?.response?.text() || "No response from AI";

   return { success: true, reply };
  } catch (error) {
    console.error("AI generation error:", error.message);
    return { success: false, message: error.message };
  }
};
