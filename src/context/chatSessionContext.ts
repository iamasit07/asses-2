import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Message } from "../types/chat.type";

export interface ChatSessionContextType {
  messages: Message[];
  typingMessage: Message | null;
  activeLLM: string;
  chatTitle: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  sendMessage: (text: string, files: File[]) => void;
  setActiveLLM: Dispatch<SetStateAction<string>>;
  setChatTitle: Dispatch<SetStateAction<string>>;
  startNewChat: (text: string, files: File[]) => string;
}

export const ChatSessionContext = createContext<
  ChatSessionContextType | undefined
>(undefined);
