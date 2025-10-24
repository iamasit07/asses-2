import { useState, type ReactNode } from "react";
import type { Message } from "../types/chatContext.types";
import { ChatContext } from "./chatContext";

const ans1: Message = {
  id: 1,
  text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  sender: "llm",
};

const ans2: Message = {
  id: 2,
  text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  sender: "llm",
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  const [activeLLM, setActiveLLM] = useState("chatgpt");
  const [chatTitle, setChatTitle] = useState<string>("");

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response: Message = {
      id: Date.now() + 1,
      text: `${text.includes("image") ? ans2.text : ans1.text}`,
      sender: "llm",
    };
    setTypingMessage(response);

    setTimeout(() => {
      setTypingMessage(null);
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 2000);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        typingMessage,
        activeLLM,
        chatTitle,
        sendMessage,
        setActiveLLM,
        setChatTitle,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
