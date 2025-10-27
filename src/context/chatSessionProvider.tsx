import { useState, type ReactNode } from "react";
import { ChatSessionContext } from "./chatSessionContext";
import { addChat, ans1, ans2 } from "../db/chats";
import { useChatHistory } from "../hooks/useChatHistory";
import type { Message } from "../types/chat.type";

const generateRandomId = () => {
  const part1 = Math.random().toString(36).substring(2, 7);
  const part2 = Math.random().toString(36).substring(2, 6);
  const part3 = Math.random().toString(36).substring(2, 6);
  return `${part1}-${part2}-${part3}`;
};

export const ChatSessionProvider = ({ children }: { children: ReactNode }) => {
  const { setRecentChatData } = useChatHistory();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  const [activeLLM, setActiveLLM] = useState("chatgpt");
  const [chatTitle, setChatTitle] = useState<string>("");

  const sendMessage = (text: string, files: File[]) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
      files: files,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response: Message = {
      id: Date.now() + 1,
      text: `${text.includes("image") ? ans2.text : ans1.text}`,
      sender: "llm",
      files: files,
    };
    setTypingMessage(response);

    setTimeout(() => {
      setTypingMessage(null);
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 1000);
  };

  const startNewChat = (text: string, files: File[]) => {
    const newChatId = generateRandomId();
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      files: files,
      sender: "user",
    };

    const response: Message = {
      id: Date.now() + 1,
      text: `${text.includes("image") ? ans2.text : ans1.text}`,
      sender: "llm",
      files: files,
    };

    const newChat = {
      id: newChatId,
      title: text ? text.substring(0, 40) : files[0]?.name || "New Chat",
      messages: [userMessage, response],
    };

    addChat(newChat);

    setMessages([userMessage]);
    setTypingMessage(response);
    setChatTitle(newChat.title);
    setRecentChatData((prevData) => [
      { id: newChat.id, title: newChat.title },
      ...prevData,
    ]);

    setTimeout(() => {
      setTypingMessage(null);
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 1000);

    return newChatId;
  };

  return (
    <ChatSessionContext.Provider
      value={{
        messages,
        typingMessage,
        activeLLM,
        chatTitle,
        setMessages,
        sendMessage,
        setActiveLLM,
        setChatTitle,
        startNewChat,
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  );
};
