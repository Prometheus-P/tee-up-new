
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Alex Rivera 마스터와의 상담 채팅 인스턴스 생성
 */
export const getConsultationChat = () => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are Alex Rivera, a world-class PGA Master Professional. 
      Tone: Elite, professional, technically precise, and encouraging. 
      Persona: Luxury service consultant for high-end golfers. 
      Use golf terminology accurately. Address the user as "Champ" or "Sir/Ma'am".`,
      temperature: 0.7,
    },
  });
};

/**
 * 골프 코스 심층 기술 분석 (Google Search 연동)
 */
export const getCourseDeepDive = async (courseName: string, location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a Master Pro's strategic guide for ${courseName} in ${location}. Focus on architectural challenges and pro-level placement.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((c: any) => c.web)
      .map((c: any) => ({ title: c.web.title, uri: c.web.uri })) || [];

    return { text: response.text, links };
  } catch (error) {
    console.error("Deep dive error:", error);
    return { text: "Unable to retrieve real-time data at the moment.", links: [] };
  }
};

/**
 * 프로의 비즈니스 데이터 기반 전략 제안 (Gemini 3 Pro Thinking)
 */
export const getProBusinessStrategy = async (revenueData: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this revenue data and suggest 3 elite growth strategies: ${JSON.stringify(revenueData)}`,
    config: {
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
};

/**
 * 라운드 성과 데이터 분석 (JSON Schema)
 */
export const analyzeRoundPerformance = async (roundData: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze performance: ${JSON.stringify(roundData)}. Return structured analysis.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "strengths", "weaknesses", "tips"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

/**
 * 위치 기반 근처 명문 코스 검색 (Google Maps 연동)
 */
export const findNearbyCourses = async (latitude: number, longitude: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // Maps Grounding은 2.5 시리즈에서 지원
    contents: "Recommend 5 elite golf courses near my current location.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: { latLng: { latitude, longitude } }
      }
    },
  });
  
  return response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter((c: any) => c.maps)
    .map((c: any) => ({ title: c.maps.title, uri: c.maps.uri })) || [];
};

/**
 * 스마트 캐디 조언 생성
 */
export const getSmartCaddyAdvice = async (courseName: string, hole: number, par: number, conditions: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a professional caddy at ${courseName}. Provide a quick strategic advice for Hole ${hole} (Par ${par}). Weather/Conditions: ${conditions}. Keep it technical and pro-level.`,
  });
  return response.text;
};

/**
 * 상담 요청 데이터 분석 및 요약
 */
export const analyzeConsultationRequest = async (formData: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this student consultation request and provide a high-level briefing for the coach: ${JSON.stringify(formData)}. Focus on identifying the primary biomechanical or mental gap.`,
  });
  return response.text;
};
