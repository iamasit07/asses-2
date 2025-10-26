import { useEffect, useState, type ReactNode } from "react";
import type { Message } from "../types/chatContext.types";
import { ChatContext } from "./chatContext";
import data, { ans1, ans2, addChat } from "../db/chats";

const generateRandomId = () => {
  const part1 = Math.random().toString(36).substring(2, 7);
  const part2 = Math.random().toString(36).substring(2, 6);
  const part3 = Math.random().toString(36).substring(2, 6);
  return `${part1}-${part2}-${part3}`;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  const [activeLLM, setActiveLLM] = useState("chatgpt");
  const [chatTitle, setChatTitle] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentChatData, setRecentChatData] = useState<
    { id: string; title: string }[]
  >([]);

  useEffect(() => {
    setRecentChatData(data.map(({ id, title }) => ({ id, title })));
  }, []);

  const startNewChat = (text: string, files: File[]) => {
    const newChatId = generateRandomId();
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      files: files,
      sender: "user",
    };

    const newChat = {
      id: newChatId,
      title: text ? text.substring(0, 40) : files[0]?.name || "New Chat",
      messages: [userMessage],
    };

    addChat(newChat);
    setMessages(newChat.messages);
    setChatTitle(newChat.title);
    setRecentChatData(data.map(({ id, title }) => ({ id, title })));

    sendMessage(text, files);

    return newChatId;
  };

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

  return (
    <ChatContext.Provider
      value={{
        recentChatData,
        messages,
        typingMessage,
        activeLLM,
        chatTitle,
        isSidebarOpen,
        setRecentChatData,
        setTypingMessage,
        setMessages,
        setIsSidebarOpen,
        sendMessage,
        setActiveLLM,
        setChatTitle,
        startNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
