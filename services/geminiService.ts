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

export const getGeminiApiKey = (): string => {
  return localStorage.getItem('user_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return "I'm currently in offline mode (API Key missing). Please click the key icon in the top right of this chat box to provide an API key, or try again later.";
    }

    const model = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const formattedContents = [
      ...history
        .filter((h, idx) => !(idx === 0 && h.role === 'model'))
        .map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
      {
        role: 'user',
        parts: [{ text: newMessage }]
      }
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini REST API Error response:", errorData);
      
      if (response.status === 400 || response.status === 403) {
        return "The request failed. This usually indicates an invalid API key. Click the key icon in the top right to verify or update your key.";
      }
      return `API Connection Error (${response.status}). Please try again later.`;
    }

    const result = await response.json();
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    return responseText || "I received your message but couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to the neural network. Please check your internet connection and try again.";
  }
};

