import ArticleIcon from "@mui/icons-material/Article";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TypewriterMessage from "./typeWriterMessage";
import { useState } from "react";
import AttachmentDisplay from "./attachmentArea";
import type { Message } from "../types/chatContext.types";

interface LLMReplyProps {
  msg: string;
  index: number;
  messages: Message[];
}

const LLMReply = ({ msg, index, messages }: LLMReplyProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const lastAiMessageIndex =
    messages
      .map((msg, idx) => ({ msg, idx }))
      .reverse()
      .find(({ msg }) => msg.sender === "llm")?.idx ?? -1;

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  return (
    <div className=" flex flex-col items-end">
      <div
        className={`relative flex flex-col max-w-2xl md:w-2xl p-4 rounded-lg shadow-md bg-gray-200 text-white`}
      >
        <div className="absolute top-2 right-2 flex items-center justify-center w-32 text-sm text-gray-500 pr-2 pl-2 rounded-full bg-gray-100">
          <div className="p-1">
            <ArticleIcon fontSize="small" />
          </div>
          <span>5 Resources</span>
        </div>
        <div className="w-full mt-8 text-gray-700">
          {index === lastAiMessageIndex ? (
            <TypewriterMessage message={msg} />
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>{msg}</p>
          )}
        </div>
        <AttachmentDisplay files={messages[index].files || []} />
        <div>
          <div className="flex items-center space-x-2 text-gray-500 mt-2 ml-1">
            <button className="p-1 rounded-md" onClick={handleLike}>
              {liked ? (
                <ThumbUpIcon fontSize="small" className="text-gray-500" />
              ) : (
                <ThumbUpOffAltIcon fontSize="small" />
              )}
            </button>
            <button className="p-1 rounded-md" onClick={handleDislike}>
              {disliked ? (
                <ThumbDownIcon fontSize="small" className="text-gray-500" />
              ) : (
                <ThumbDownOffAltIcon fontSize="small" />
              )}
            </button>
            <button
              className="p-1 rounded-md cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(msg);
                alert("Message copied to clipboard");
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMReply;
