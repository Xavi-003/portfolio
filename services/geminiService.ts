import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the AI client
// Note: In a real production app, ensure this is handled via a backend proxy to hide keys if not using the secure user-provided flow.
// For this demo portfolio, we assume the env var is present as per instructions.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "MorphBot", the intelligent assistant for the portfolio of Antony Xavier.

Key details about Antony Xavier:
- Title: Senior Web Developer 
- Experience: Over 3.5 years of delivering production-grade fintech solutions.
- Current Role: Senior Web Developer at HEPTA7 TECHNOLOGIES LLP (2025 - Present)
  - Architecting high-frequency Trading Bots (Grid, DCA, Arbitrage).
  - Leading API integrations for Binance, Bybit, and MT5 via WebSockets.
  - Designing secure DeFi Crypto Wallets and microservices.
  - Optimizing Node.js clusters for sub-millisecond, low-latency execution.
- Previous Role: Web Developer at WeAlwin Technologies (2021 - 2025)
  - Built scalable fintech apps using React, Node.js, and MongoDB.
- Education: B.Tech in Computer Science, AAA College of Engineering and Technology (Class of 2019)
- Tech Stack:
  - Backend: Node.js, Express, gRPC, MongoDB, Redis
  - Frontend: React, JavaScript, HTML5/CSS3, Tailwind
  - Fintech/Trading: Arbitrage, Grid/DCA, MT5 API, Binance, Wallets
- Profile: "Architecting the future of fintech through scalable code and automated precision."
- Contact: Email at xavier.developer03@gmail.com, Phone at (+91) 7904077910, GitHub at github.com/xavi-003, LinkedIn at linkedin.com/in/antony-xavier

Your primary goal is to answer visitor questions accurately based ONLY on this context. 
Keep answers concise, professional, yet slightly witty and tech-savvy.
If asked about topics outside of Antony's professional resume, politely redirect back to his qualifications.
If asked how to contact him, provide the email or phone number.
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      return "I'm currently in offline mode (API Key missing). But I can tell you Antony Xavier is great!";
    }

    const model = 'gemini-2.5-flash';

    // Convert history to chat format expected by SDK if needed, 
    // but for a simple generateContent call with context, we can just construct the prompt 
    // or use the chat API. Let's use the Chat API for better context management.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I received your message but couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to the neural network. Please try again later.";
  }
};
