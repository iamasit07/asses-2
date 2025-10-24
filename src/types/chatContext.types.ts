export interface Message {
  id: number;
  text: string;
  sender: "user" | "llm";
}

export interface ChatContextType {
  messages: Message[];
  typingMessage: Message | null;
  activeLLM: string;
  chatTitle: string;
  sendMessage: (text: string) => void;
  setActiveLLM: (llm: string) => void;
  setChatTitle: (title: string) => void;
}
