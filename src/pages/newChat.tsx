import ChatArea from "../components/chat-area";
import Sidebar from "../components/sidebar";
import React, { useEffect } from "react";
import data from "../db/chats";
import { useChat } from "../context/chatContext";
import { useNavigate, useParams } from "react-router-dom";

const NewChat: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { setMessages, setChatTitle } = useChat();

  useEffect(() => {
    if (chatId) {
      const chat = data.find((chat) => chat.id === chatId);
      if (chat) {
        setMessages(chat.messages);
        setChatTitle(chat.title);
      } else {
        setMessages([]);
        setChatTitle("");
        navigate("/new-chat");
      }
    }
  }, [chatId, setMessages, setChatTitle, navigate]);

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
