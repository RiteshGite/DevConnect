const express = require("express");
const { askGemini } = require("../utils/geminiService");

const aiRouter = express.Router();

aiRouter.post("/ai/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // Validation
        if (!message || typeof message !== "string") {
            return res.json({
                reply: "Please send a valid message."
            });
        }

        if (message.trim().length === 0) {
            return res.json({
                reply: "Please ask a question about DevConnect!"
            });
        }

        if (message.length > 300) {
            return res.json({
                reply: "Please keep your question under 300 characters."
            });
        }

        const reply = await askGemini(message);

        res.json({ reply });
    } catch (err) {
        console.error("AI Chat Error:", err);
        res.status(500).json({
            reply: "AI assistant is temporarily unavailable. Please try again later."
        });
    }
});

module.exports = aiRouter;