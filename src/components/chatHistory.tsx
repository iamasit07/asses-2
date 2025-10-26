import { useEffect, useRef } from "react";
import type { Message } from "../types/chat.type";
import SuggestionCard from "./suggestion-card";
import UserReply from "./userReply";
import LLMReply from "./llmReply";
import { useChatSession } from "../hooks/useChatSession";

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
  const { messages, typingMessage } = useChatSession();
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
                <div className="flex flex-col items-start w-full max-w-2xl">
                  <div
                    className={`relative flex flex-col w-full p-4 rounded-lg shadow-md bg-gray-200 animate-pulse`}
                  >
                    {/* Skeleton for "Resources" badge (right-aligned) */}
                    <div className="absolute top-2 right-2 h-6 w-32 rounded-full bg-gray-300"></div>

                    {/* Skeleton for text content (left-aligned within bubble) */}
                    <div className="w-full mt-5">
                      {" "}
                      {/* Margin-top to clear the badge */}
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>

                    {/* Skeleton for AttachmentDisplay area (left-aligned within bubble) */}
                    <div className="h-24 w-48 bg-gray-300 rounded-lg mt-3"></div>

                    {/* Skeleton for action buttons (left-aligned within bubble) */}
                    <div>
                      <div className="flex items-center space-x-2 mt-3 ml-1">
                        <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                        <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                        <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                      </div>
                    </div>
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
