import ChatArea from "../components/chat-area";
import Sidebar from "../components/sidebar";
import React from "react";

const NewChat: React.FC = () => {
  return (
    <div className="Brico flex h-screen bg-blue-50">
      <div className="flex relative">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <ChatArea />
      </main>
    </div>
  );
};

export default NewChat;
