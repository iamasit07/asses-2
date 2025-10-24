import { useChat } from "../context/chatContext";
import Header from "./header";
import ChatHistory from "./chatHistory";
import InputArea from "./inputArea";

const ChatArea = () => {
  const { chatTitle } = useChat();

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-full bg-white border border-gray-300 rounded-t-2xl md:p-2 md:pb-0 overflow-hidden">
        <Header title={chatTitle} />
        <ChatHistory />
        <InputArea />
      </div>
    </>
  );
};

export default ChatArea;
