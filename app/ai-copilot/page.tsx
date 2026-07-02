"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const predefinedQuestions = [
  "Why is Candidate A ranked higher?",
  "Show strongest leadership candidates.",
  "Show candidates with AI experience.",
  "Compare Candidate A and B.",
];

const AiCopilotPage = () => {
  const [messages, setMessages] = useState<Message[]>(
    [{ id: "1", sender: "ai", text: "Hello! How can I assist you with your hiring today?" }]
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (textToSend.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/copilot?query=${encodeURIComponent(textToSend)}`);
      const data = await res.json();
      const aiResponseText = data.response || "Sorry, I encountered an error processing your query.";
      const aiMessageId = Date.now().toString() + "-ai";

      let currentAiText = "";
      const words = aiResponseText.split(" ");

      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 20)); // typing effect
        currentAiText += (i > 0 ? " " : "") + words[i];
        setMessages((prev) => {
          const existingMessageIndex = prev.findIndex((msg) => msg.id === aiMessageId);
          if (existingMessageIndex > -1) {
            const updatedMessages = [...prev];
            updatedMessages[existingMessageIndex] = { ...updatedMessages[existingMessageIndex], text: currentAiText };
            return updatedMessages;
          } else {
            return [...prev, { id: aiMessageId, sender: "ai", text: currentAiText }];
          }
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: "I'm having trouble connecting to the ranking engine API. Please make sure the FastAPI server is running at http://127.0.0.1:8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 flex flex-col h-full overflow-hidden"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">AI Recruiter Copilot</h1>

      <Card className="flex-1 bg-[#111113] border border-white/10 rounded-xl shadow-lg flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-6 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <Avatar className="h-8 w-8 mr-3 bg-blue-500/20 text-blue-300">
                      <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user"
                        ? "bg-blue-600/30 text-white rounded-br-none"
                        : "bg-gray-700/30 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <Avatar className="h-8 w-8 ml-3 bg-purple-500/20 text-purple-300">
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-wrap gap-2 mb-4">
            {predefinedQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant="outline"
                  className="text-gray-400 border-white/10 hover:bg-white/10 hover:text-white transition-colors duration-200"
                  onClick={() => handlePredefinedQuestion(question)}
                >
                  {question}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask TalentMind AI anything..."
              className="flex-1 bg-[#09090b] border border-white/10 text-white focus:ring-blue-500 focus:border-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleSendMessage();
                }
              }}
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Send
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AiCopilotPage;
