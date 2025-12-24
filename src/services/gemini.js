// Using direct REST API to bypass SDK issues
export const generateContent = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("API Key is missing");
  
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log("Gemini Response:", text);
    return text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const AI_PROMPTS = {
  vision: (name, brief) => `Write a compelling product vision and problem statement for a project named "${name}". Context: ${brief}. Return JSON format: { "vision": "...", "problemStatement": "..." }`,
  
  personas: (vision) => `Based on this vision: "${vision}", list 3-5 target user personas and 3 key user stories for each. Return JSON format: { "targetAudience": ["Persona 1", ...], "userStories": ["As a...", ...] }`,
  
  features: (vision, audience) => `Based on vision "${vision}" for audience "${audience}", list 5 key functional features with brief descriptions. Return JSON format: { "features": [{ "title": "...", "description": "..." }, ...] }`
};
