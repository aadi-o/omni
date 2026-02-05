
import { GoogleGenAI, Type } from "@google/genai";
import { ModelName } from "../types";

const getAIClient = () => {
  // Always use a named parameter and obtain API key exclusively from process.env.API_KEY
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Helper to clean JSON strings from Markdown code blocks
const cleanJsonResponse = (text: string) => {
  return text.replace(/```json\n?|```/g, "").trim();
};

export const generateVideoIdeas = async (topic: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: `You are a viral content strategist. Generate 5 highly-optimized video ideas for: "${topic}". 
    For each idea, provide:
    1. A "Psychological Hook" (to stop the scroll)
    2. "Retention-Focused Content" (core value)
    3. "Conversion CTA" (specific action)
    Format the response in beautiful Markdown with icons.`,
  });
  return response.text;
};

export const generateHashtags = async (content: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: `Analyze this content: "${content}". 
    Generate a precision-targeted hashtag strategy:
    - 5 Viral (1M+ posts)
    - 10 Growth (100k-500k posts)
    - 15 Niche (Specific to the topic)
    Explain why this strategy works for the current algorithm.`,
  });
  return response.text;
};

export const writeProfessionalCode = async (prompt: string, language: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: ModelName.PRO,
    contents: `Act as a Staff Software Engineer. Write production-ready, highly-optimized ${language} code for: "${prompt}". 
    Requirements:
    - Clean code principles
    - Error handling
    - Performance considerations
    - Concise comments`,
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
    contents: `Analyze this professional resume. Evaluate the candidate against modern industry standards.
    Return the analysis strictly in JSON format.
    CV Text: "${cvText}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Professional score from 0 to 100" },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3-5 professional assets" },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Areas requiring optimization" },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable steps to improve the CV" },
          roleMatch: { type: Type.STRING, description: "The top 3 job titles this person should apply for" }
        },
        required: ["score", "strengths", "weaknesses", "suggestions", "roleMatch"]
      }
    }
  });
  
  try {
    const cleaned = cleanJsonResponse(response.text || '{}');
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parsing failed", e);
    return {
        score: 0,
        strengths: ["Error parsing analysis"],
        weaknesses: ["AI response format was invalid"],
        suggestions: ["Please try a shorter CV text"],
        roleMatch: "N/A"
    };
  }
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

  // Simplified and standardized contents format for sending text and image data
  const response = await ai.models.generateContent({
    model: ModelName.FLASH,
    contents: {
      parts: [
        {
          text: "Please perform a high-precision OCR. Focus on preserving data tables, numbered lists, and bold headings. Return in Markdown.",
        },
        {
          inlineData: {
            mimeType: file.type,
            data: base64,
          },
        },
      ],
    },
  });
  return response.text;
};
