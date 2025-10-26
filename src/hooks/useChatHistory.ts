import { useContext } from "react";
import {
  ChatHistoryContext,
  type ChatHistoryContextType,
} from "../context/chatHistoryContext";

export const useChatHistory = (): ChatHistoryContextType => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider");
  }
  return context;
};
