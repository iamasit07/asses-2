import Header from "./header";
import ChatHistory from "./chatHistory";
import InputArea from "./inputArea";
import { useChatSession } from "../hooks/useChatSession";

const ChatArea = () => {
  const { chatTitle } = useChatSession();

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
