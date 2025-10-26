import { useEffect, useRef } from "react";
import { useChat } from "../context/chatContext";
import type { Message } from "../types/chatContext.types";
import SuggestionCard from "./suggestion-card";
import UserReply from "./userReply";
import LLMReply from "./llmReply";

const suggestions = [
  {
    title: "Give me a concise summary of this meeting transcript",
  },
  {
    title: "Write a product description for a minimalist smartwatch",
  },
  {
    title: "Provide a polite response to a customer asking for a refund",
  },
];

const ChatHistory = () => {
  const { messages, typingMessage } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [messages, typingMessage]);

  return (
    <>
      <div className="grow w-full max-w-4xl p-4 md:p-8 space-y-4 overflow-y-auto chat-history-container">
        {messages.length === 0 && !typingMessage ? (
          // --- Suggestions View ---
          <>
            <div className="flex flex-col w-full items-center justify-center mt-20 space-y-12">
              <div className="flex flex-col w-2xs md:w-full space-y-12">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col w-full h-full">
                    <div className="text-3xl font-extrabold text-gray-900 mb-4">
                      <span>👋🏼Hi Laurence!</span>
                    </div>
                    <div className="text-5xl font-slim text-gray-900 w-auto md:min-w-64 md:w-lg">
                      <span>What do you want to learn today?</span>
                    </div>
                  </div>
                </div>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {suggestions.map((text) => (
                    <SuggestionCard key={text.title} title={text.title} />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          // --- Chat History View ---
          <>
            {messages.map((msg: Message, index: number) => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.sender === "user" ? (
                  // --- User Message ---
                  <UserReply msg={msg.text} index={index} messages={messages} />
                ) : (
                  // --- AI Message ---
                  <LLMReply msg={msg.text} index={index} messages={messages} />
                )}
              </div>
            ))}

            {typingMessage && (
              <div className="flex w-full justify-end">
                <div className=" flex flex-col items-start">
                  <div
                    className={`relative flex flex-col p-4 rounded-lg max-w-2xl shadow-md bg-gray-200 text-gray-700`}
                  >
                    <p className="italic">Typing...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatContainerRef} />
          </>
        )}
      </div>
    </>
  );
};

export default ChatHistory;
