export interface Message {
  id: number;
  text: string;
  sender: "user" | "llm";
  files?: File[];
}

export interface ChatContextType {
  recentChatData: { id: string; title: string }[];
  messages: Message[];
  typingMessage: Message | null;
  activeLLM: string;
  chatTitle: string;
  isSidebarOpen: boolean;
  setRecentChatData: (data: { id: string; title: string }[]) => void;
  setTypingMessage: (message: Message | null) => void;
  setMessages: (messages: Message[]) => void;
  sendMessage: (text: string, files: File[]) => void;
  setActiveLLM: (llm: string) => void;
  setChatTitle: (title: string) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  startNewChat: (text: string, files: File[]) => string;
}
