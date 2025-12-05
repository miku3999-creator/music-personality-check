import { GoogleGenAI } from "@google/genai";
import { FinalResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePersonalityAnalysis = async (
  code: string,
  typeName: string,
  artistNames: string[]
): Promise<Partial<FinalResult>> => {
  try {
    const prompt = `
      You are a music personality profiler.
      The user's diagnosis is:
      - Code: ${code}
      - Type Name: ${typeName}
      - Favorite Artists: ${artistNames.join(', ')}

      Please generate a JSON response with the following fields:
      1. "title": A short, catchy Japanese title for this result (max 20 chars).
      2. "body": A 3-4 line description of this personality type in Japanese, incorporating the vibe of their music taste.
      3. "imagePrompt": An English image generation prompt for a "Cute Chibi character portrait" representing this type. Follow this template: "Cute Chibi character portrait, full body, minimal details, soft lighting, vibrant colors, clean vector art style, simple gradient background. Based on the music personality type: ${code} type, the ${typeName}."

      Return ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text response from Gemini");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      title: `${code} - ${typeName}`,
      body: "詳細な分析の生成に失敗しました。しかし、あなたの音楽の好みは独自のスタイルを示しています。",
      imagePrompt: `Cute Chibi character portrait, based on music personality ${code}, ${typeName}`
    };
  }
};

export const generatePersonalityImage = async (prompt: string): Promise<string | undefined> => {
  try {
    // Try High Quality model first
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for speed/availability, switch to 'gemini-3-pro-image-preview' for better quality if available
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        // imageConfig not strictly needed for basic gen, but helpful if strictly enforcing aspect ratio
      }
    });
    
    // Parse response for image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Generation Error:", error);
  }
  return undefined;
};
