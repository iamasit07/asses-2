import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRef } from "react";
import { useChat } from "../context/chatContext";
import type { Message } from "../types/chatContext.types";
import SuggestionCard from "./suggestion-card";
import TypewriterMessage from "./typeWriterMessage";

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
  return (
    <>
      <div
        ref={chatContainerRef}
        className="grow w-full max-w-4xl p-4 md:p-8 space-y-4 overflow-y-auto chat-history-container"
      >
        {messages.length === 0 && !typingMessage ? (
          // --- Suggestions View ---
          <div className="flex flex-col w-full items-center justify-center mt-20 space-y-12">
            <div className="flex flex-col w-full max-w-4xl space-y-12">
              <div className="flex flex-col h-full">
                <div className="flex flex-col w-full h-full">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    <span>👋🏼Hi Laurence!</span>
                  </div>
                  <div className="text-4xl font-slim text-gray-900 min-w-64">
                    <span>What do you want to learn today?</span>
                  </div>
                </div>
              </div>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {suggestions.map((text, index) => (
                  <SuggestionCard
                    key={index}
                    title={text.title}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.sender === "user" ? (
                  <div className="flex items-start space-x-2">
                    <AccountCircleIcon
                      style={{ fontSize: 40 }}
                      className="text-blue-200 mt-1"
                    />
                    <div
                      className={`p-3 rounded-lg max-w-2xl shadow-md bg-blue-200 text-gray-900`}
                    >
                      <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-col items-start">
                    <div
                      className={`relative flex flex-col p-4 rounded-lg max-w-2xl shadow-md bg-gray-200 text-white`}
                    >
                      <div className="absolute top-2 right-2 flex items-center justify-center w-32 text-sm text-gray-500 pr-2 pl-2 rounded-full bg-gray-100">
                        <div className="p-1">
                          <ArticleIcon fontSize="small" />
                        </div>
                        <span>5 Resources</span>
                      </div>
                      <div className="w-full mt-8 text-gray-700">
                        <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                      </div>
                      <div>
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 text-gray-500 mt-2 ml-1">
                          <button className="p-1 rounded-md">
                            <ThumbUpOutlinedIcon fontSize="small" />
                          </button>
                          <button className="p-1 rounded-md">
                            <ThumbDownOutlinedIcon fontSize="small" />
                          </button>
                          <button className="p-1 rounded-md">
                            <ContentCopyIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Render the *typing* message */}
            {typingMessage && (
              <div className="flex w-full justify-end">
                <TypewriterMessage message={typingMessage.text} delay={100} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChatHistory;
