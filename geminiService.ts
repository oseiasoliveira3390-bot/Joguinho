
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuestNarrative = async (questTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma breve narrativa épica de RPG para a missão intitulada: "${questTitle}". O texto deve ter no máximo 150 caracteres e ser imersivo.`,
    });
    return response.text || "Uma nova jornada o aguarda.";
  } catch (error) {
    console.error("Gemini narrative error:", error);
    return "A sombra do mal paira sobre Eldoria.";
  }
};

export const getNPCResponse = async (npcName: string, playerAction: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O jogador falou ou fez: "${playerAction}" com o NPC "${npcName}". Como o NPC reagiria de forma curta e direta?`,
      config: {
        systemInstruction: "Você é um mestre de RPG experiente. Responda como o NPC indicado.",
      }
    });
    return response.text || "Eu não tenho nada a dizer sobre isso agora.";
  } catch (error) {
    return "Hm... interessante.";
  }
};
