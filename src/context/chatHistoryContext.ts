import { createContext, type Dispatch, type SetStateAction } from "react";

export interface ChatHistoryContextType {
  recentChatData: { id: string; title: string }[];
  setRecentChatData: Dispatch<SetStateAction<{ id: string; title: string }[]>>;
}

export const ChatHistoryContext = createContext<
  ChatHistoryContextType | undefined
>(undefined);
