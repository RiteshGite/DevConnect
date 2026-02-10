const { GEMINI_PROMPT } = require("./constants");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(userMessage) {
    try {
        const cleanMessage =
            typeof userMessage === "string"
                ? userMessage.trim()
                : userMessage?.message || "";

        if (!cleanMessage) {
            return "Please ask a valid question about DevConnect.";
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ UPDATED TO WORKING MODEL
        });

        const prompt = `${GEMINI_PROMPT}

User question: ${cleanMessage}

Provide a helpful, concise response (2-4 lines max).`;

        const result = await model.generateContent(prompt);
        const text = result?.response?.text();

        return text || "I'm here to help you with DevConnect! Ask me about features, memberships, or how to use the app.";
    } catch (err) {
        console.error("Gemini Error:", err.message);
        return "I'm having trouble connecting right now. Please try again in a moment!";
    }
}

module.exports = { askGemini };