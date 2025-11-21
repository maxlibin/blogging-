"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { ResearchSource, ResearchResult } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performResearch = async (topic: string): Promise<ResearchResult> => {
  const ai = getAI();
  
  let summary = "";
  const sources: ResearchSource[] = [];
  
  // Step 1: Research using Google Search Grounding
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Research the following topic in depth: "${topic}". 
      
      Directives:
      1. **LATEST NEWS**: Focus strictly on the most recent articles, news, and updates from the web (e.g., last 30 days if applicable).
      2. **DATES**: For every key finding or fact you list, you MUST explicitly mention the publication date of the source article (e.g., "As reported on Oct 15, 2024...").
      3. Summarize the key findings in bullet points suitable for a blog post outline.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    summary = response.text || "No research generated.";
    
    // Extract sources from grounding metadata
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach(chunk => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Web Source",
            uri: chunk.web.uri || "#"
          });
        }
      });
    }
  } catch (error) {
    console.error("Research step failed:", error);
    throw new Error("Failed to research topic.");
  }

  // Step 2: Analyze the search results to get structured trend data AND suggested topics
  try {
    const analysisPrompt = `
      Analyze the following research summary about "${topic}" and extract trend intelligence.
      Then, based on these trends, brainstorm 4 specific, high-performing blog post titles that would appeal to readers right now.
      
      Research Summary:
      ${summary}
      
      Return a JSON object with the following properties:
      - sentiment: "positive", "neutral", or "negative"
      - key_events: Array of key event strings
      - sources_news: Array of news source names mentioned
      - sources_social: Array of social media sources mentioned
      - suggested_topics: Array of objects, each containing:
          - title: A catchy, click-worthy blog post title.
          - rationale: A short sentence explaining why this title works based on the research.
    `;

    const analysisResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: analysisPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            key_events: { type: Type.ARRAY, items: { type: Type.STRING } },
            sources_news: { type: Type.ARRAY, items: { type: Type.STRING } },
            sources_social: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggested_topics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  rationale: { type: Type.STRING }
                },
                required: ["title", "rationale"]
              }
            }
          },
          required: ["sentiment", "key_events", "sources_news", "sources_social", "suggested_topics"]
        }
      }
    });

    const analysisText = analysisResponse.text;
    const trendAnalysis = analysisText ? JSON.parse(analysisText) : {
      sentiment: 'neutral',
      key_events: [],
      sources_news: [],
      sources_social: [],
      suggested_topics: []
    };

    // Ensure sentiment is valid
    if (!['positive', 'neutral', 'negative'].includes(trendAnalysis.sentiment)) {
        trendAnalysis.sentiment = 'neutral';
    }

    return { summary, sources, trendAnalysis };

  } catch (error) {
    console.error("Analysis step failed:", error);
    // Fallback
    return {
      summary,
      sources,
      trendAnalysis: {
        sentiment: 'neutral',
        key_events: [],
        sources_news: [],
        sources_social: [],
        suggested_topics: []
      }
    };
  }
};

export const generateBlogImage = async (topic: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `Create a high-quality, professional blog featured image for the topic: "${topic}".
        Style guidelines: Modern, minimalist, editorial illustration, abstract tech or business concept, soft gradient lighting (purple, blue, orange). 
        No text in the image.`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
        },
    });

    const image = response.generatedImages?.[0]?.image;
    if (image && image.imageBytes) {
        return `data:image/jpeg;base64,${image.imageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    // Return null to allow the process to continue without an image if generation fails
    return null; 
  }
};

export const writeBlogPost = async (topic: string, researchSummary: string): Promise<{ title: string; content: string }> => {
  const ai = getAI();

  try {
    const prompt = `
      You are a professional, empathetic, and witty blog writer. Write a **highly humanized** blog post about the specific title: "${topic}".
      
      Use the following background research notes (which include dates) to ground the article in fact, but write specifically for the chosen title:
      ${researchSummary}

      Requirements:
      1. Return the result as a JSON object.
      2. "title": The final optimized title (should match the requested topic closely but can be polished).
      3. "content": The full blog post body in HTML format (use <h2>, <h3>, <p>, <ul>, etc.).
      4. **Tone**: Conversational, personal, and authoritative. Use sentence variety (mix short and long). Avoid stiff "AI-like" transitions (e.g., avoid "In conclusion", "Delving into", "In the rapidly evolving landscape").
      5. **Timeliness**: Incorporate the dates found in the research to show the reader this content is fresh and up-to-date.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["title", "content"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from AI");

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Writing failed:", error);
    throw new Error("Failed to generate blog post content.");
  }
};