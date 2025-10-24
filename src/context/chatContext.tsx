import { createContext, useContext } from "react";
import type { ChatContextType } from "../types/chatContext.types";

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
