import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize AI only if key exists to prevent crash on start, handle errors gracefully in calls
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeSpeaking = async (transcript: string, context: string): Promise<string> => {
  if (!ai) return "Simulação: Chave de API não configurada. O professor analisará sua fala em breve.";

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Você é um professor sênior da Alle, uma escola de idiomas premium focada em fluência real e comunicação humana.
      
      Analise a seguinte transcrição de uma fala de um aluno (Nível B1/B2):
      "${transcript}"
      
      Contexto do exercício: ${context}
      
      Forneça um feedback curto, encorajador e direto (máximo 3 frases).
      Foque na naturalidade e clareza comunicativa, não apenas gramática rígida.
      Use um tom adulto, profissional e empático.
      Se houver um erro grave que impeça a compreensão, aponte delicadamente.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Não foi possível gerar análise no momento.";
  } catch (error) {
    console.error("Erro na análise de speaking:", error);
    return "Ocorreu um erro ao processar sua análise. Tente novamente.";
  }
};

export const suggestRealLifeApplication = async (topic: string): Promise<string> => {
    if (!ai) return "Útil para situações cotidianas e profissionais.";

    try {
        const model = "gemini-2.5-flash";
        const prompt = `
            Para o tópico de estudo de inglês: "${topic}", explique em UMA frase curta e direta:
            "Isso serve pra quê na vida real?"
            Exemplo: "Small talk em reuniões" ou "Como discordar educadamente".
        `;
         const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "Aplicação prática em situações reais.";
    } catch (error) {
        return "Aplicação prática em situações reais.";
    }
}
