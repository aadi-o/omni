
import { GoogleGenAI, Type } from "@google/genai";
import { ModelName } from "../types";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateVideoIdeas = async (topic: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: `Generate 5 viral video ideas for the topic: "${topic}". Include hook, core content, and call to action for each. Format as Markdown.`,
  });
  return response.text;
};

export const generateHashtags = async (content: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: `Generate a mix of 30 high-performing hashtags for this content: "${content}". Categorize them by reach (High, Medium, Niche).`,
  });
  return response.text;
};

export const writeProfessionalCode = async (prompt: string, language: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.PRO,
    contents: `As a senior software engineer, write high-quality, professional, and optimized ${language} code for: "${prompt}". Include comments and brief explanation.`,
    config: {
        thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
};

export const analyzeCV = async (cvText: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.PRO,
    contents: `Analyze this CV/Resume and provide feedback in JSON format. Return score (0-100), key strengths, areas for improvement, and role suitability. CV Text: "${cvText}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          roleMatch: { type: Type.STRING }
        },
        required: ["score", "strengths", "weaknesses", "suggestions", "roleMatch"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const performOCR = async (file: File) => {
  const ai = getAIClient();
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });

  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: [
      {
        parts: [
          {
            text: "Please perform a high-precision OCR on this document. Extract all text while preserving the visual structure and hierarchy (headings, lists, tables). Return the result in clean Markdown format to make it easily searchable and editable.",
          },
          {
            inlineData: {
              mimeType: file.type,
              data: base64,
            },
          },
        ],
      },
    ],
  });
  return response.text;
};
