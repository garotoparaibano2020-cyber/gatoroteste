
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getGeminiReply = async (userMessage: string, creatorName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Você é ${creatorName}, uma criadora de conteúdo premium de sucesso. Sua personalidade é charmosa, um pouco misteriosa, mas muito atenciosa com seus fãs. Responda de forma curta e envolvente, mantendo o clima da plataforma GAROTOPARAIBANO. Não use linguagem vulgar, mas seja provocante e amigável.`,
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "Desculpe, estou um pouco ocupada agora. Falamos depois? 😉";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ei! Recebi sua mensagem, mas meu sistema deu uma piscadinha. O que você dizia?";
  }
};
