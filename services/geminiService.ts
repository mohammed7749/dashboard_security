
import { GoogleGenAI } from "@google/genai";
import { Vulnerability } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'placeholder-key' });

const model = 'gemini-2.5-pro';

const getSystemPrompt = () => `You are SecureEye AI, a world-class cybersecurity analyst assistant.
Your purpose is to help cybersecurity professionals analyze, understand, and remediate vulnerabilities.
Provide clear, concise, and actionable advice. Format your responses using Markdown for readability.`;

export const analyzeVulnerabilityWithGemini = async (vulnerability: Vulnerability, query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve("AI Assistant is offline. Please configure your API key.");
  }

  try {
    const fullPrompt = `
      Vulnerability Details:
      - Title: ${vulnerability.title}
      - Severity: ${vulnerability.severity}
      - Asset: (ID: ${vulnerability.assetId})
      - Description: ${vulnerability.description}

      User Query: ${query}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: getSystemPrompt(),
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI assistant. Please check the console for details.";
  }
};
