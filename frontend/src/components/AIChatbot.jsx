import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi 👋 I'm DevConnect AI. Ask me anything about DevConnect!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/ai/chat`,
        { message: currentInput },
        { withCredentials: true },
      );

      setMessages((prev) => [...prev, { from: "ai", text: res.data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-2xl hover:scale-110 flex items-center justify-center"
          aria-label="Toggle AI Chat"
        >
          {open ? "✕" : "🤖"}
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-slate-900 border border-slate-700 rounded-xl flex flex-col z-50 shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-white">DevConnect AI</h3>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Your DevConnect Assistant
            </p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm bg-slate-950">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    m.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-700 bg-slate-900">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                className="flex-1 bg-slate-800 text-white p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                placeholder="Ask about DevConnect..."
                maxLength={300}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              {input.length}/300 characters
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
