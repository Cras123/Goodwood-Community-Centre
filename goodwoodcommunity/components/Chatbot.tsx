// src/components/Chatbot.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { qnaData, defaultAnswer } from "../data/data"; //path for datasource

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! Ask me about the Goodwood Community Centre.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findAnswer = (userInput: string): string => {
    const normalizedInput = userInput
      .toLowerCase()
      .trim()
      .replace(/[?.,!]/g, "");
    const inputWords = new Set(
      normalizedInput.split(/\s+/).filter((word) => word.length > 1)
    ); // Ignore very short words

    if (
      normalizedInput === "hi" ||
      normalizedInput === "hello" ||
      normalizedInput === "hey"
    ) {
      return "Hello! How can I help you today?";
    }

    let bestMatch: string | null = null;
    let highestScore = 0;

    for (const qa of qnaData) {
      let currentScore = 0;
      const questionKeywords = qa.keywords.map((k) => k.toLowerCase());

      for (const keyword of questionKeywords) {
        // Check if the keyword exists as a whole word in the input
        if (inputWords.has(keyword)) {
          currentScore += 2; // Higher score for whole word match
        }
        // Check if the keyword phrase is part of the input string
        else if (normalizedInput.includes(keyword)) {
          currentScore += 1; // Lower score for partial match
        }
      }

      if (currentScore > 0 && currentScore >= highestScore) {
        // >= allows matching multiple equally good answers (takes last one)
        // Small improvement: If scores are equal, prefer shorter answers? Or answers with more specific keywords?
        // For now, just take the highest score.
        highestScore = currentScore;
        bestMatch = qa.answer;
      }
    }
    return bestMatch || defaultAnswer;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const newUserMessage: Message = { sender: "user", text: trimmedInput };
    const botResponseText = findAnswer(trimmedInput);
    const newBotMessage: Message = { sender: "bot", text: botResponseText };

    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window - Hidden when not open */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <span>Chat with Agent Goodwood</span>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            aria-label="Close Chatbot"
          >
            <FaTimes />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {/* Element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask a question..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className="send-btn"
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Floating Chat Button - Hidden when chat is open */}
      <button
        onClick={toggleChat}
        className={`chat-toggle-button ${isOpen ? "hidden" : ""}`}
        aria-label="Open chat"
      >
        <FaComments />
      </button>

      <style jsx>{`
        .chat-toggle-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #3182ce; // Match submit button color
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          transition: transform 0.2s ease-out, opacity 0.3s ease;
          opacity: 1;
        }

        .chat-toggle-button.hidden {
          transform: scale(0);
          opacity: 0;
        }

        .chat-toggle-button:hover {
          background-color: #2b6cb0; // Darker shade on hover
        }

        .chat-window {
          position: fixed;
          bottom: 100px; /* Position above the toggle button */
          right: 30px;
          width: 350px;
          max-width: 90vw;
          height: 450px;
          max-height: 70vh;
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1001;
          transform: scale(0); /* Hidden by default */
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
          opacity: 0;
        }

        .chat-window.open {
          transform: scale(1);
          opacity: 1;
        }

        .chat-header {
          background: linear-gradient(
            to right,
            #3182ce,
            #2b6cb0
          ); // Match submit button gradient
          color: white;
          padding: 15px 20px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }

        .chat-messages {
          flex-grow: 1;
          padding: 15px;
          overflow-y: auto;
          background-color: #f7fafc; // Light background for messages
        }

        .message {
          margin-bottom: 12px;
          padding: 10px 15px;
          border-radius: 18px;
          max-width: 80%;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .message.user {
          background-color: #ebf8ff; // Light blue for user
          color: #2d3748;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }

        .message.bot {
          background-color: #e2e8f0; // Light grey for bot
          color: #2d3748;
          margin-right: auto;
          border-bottom-left-radius: 5px;
        }

        /* Scrollbar styles (optional, for better aesthetics) */
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        .chat-input-area {
          display: flex;
          padding: 15px;
          border-top: 1px solid #e2e8f0;
          background-color: #ffffff;
        }

        .chat-input-area input {
          flex-grow: 1;
          border: 1px solid #cbd5e0;
          border-radius: 20px;
          padding: 10px 15px;
          margin-right: 10px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input-area input:focus {
          border-color: #3182ce;
        }

        .send-btn {
          background-color: #3182ce;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .send-btn:hover {
          background-color: #2b6cb0;
        }

        /* Simple responsive adjustments */
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 90px); /* Adjust height */
            bottom: 70px; /* Position above button */
            right: 20px;
            max-height: none; /* Remove max-height */
          }
          .chat-toggle-button {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
