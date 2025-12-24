import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateContent = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("API Key is missing");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-1.5-flash as it is the current standard
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response:", text);
    return text;
  } catch (error) {
    console.error("Gemini Generation Error Full:", error);
    if (error.response?.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error("Content generation blocked by safety filters.");
    }
    throw error;
  }
};

export const AI_PROMPTS = {
  vision: (name, brief) => `Write a compelling product vision and problem statement for a project named "${name}". Context: ${brief}. Return JSON format: { "vision": "...", "problemStatement": "..." }`,
  
  personas: (vision) => `Based on this vision: "${vision}", list 3-5 target user personas and 3 key user stories for each. Return JSON format: { "targetAudience": ["Persona 1", ...], "userStories": ["As a...", ...] }`,
  
  features: (vision, audience) => `Based on vision "${vision}" for audience "${audience}", list 5 key functional features with brief descriptions. Return JSON format: { "features": [{ "title": "...", "description": "..." }, ...] }`
};
