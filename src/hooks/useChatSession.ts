import { useContext } from "react";
import {
  ChatSessionContext,
  type ChatSessionContextType,
} from "../context/chatSessionContext";

export const useChatSession = (): ChatSessionContextType => {
  const context = useContext(ChatSessionContext);
  if (!context) {
    throw new Error("useChatSession must be used within a ChatSessionProvider");
  }
  return context;
};
