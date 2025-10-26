import { useState, useEffect, type ReactNode } from "react";
import { ChatHistoryContext } from "./chatHistoryContext";
import data from "../db/chats";

interface ChatData {
  id: string;
  title: string;
}

export const ChatHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [recentChatData, setRecentChatData] = useState<ChatData[]>([]);

  useEffect(() => {
    setRecentChatData(data.map(({ id, title }) => ({ id, title })));
  }, []);

  return (
    <ChatHistoryContext.Provider value={{ recentChatData, setRecentChatData }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};
