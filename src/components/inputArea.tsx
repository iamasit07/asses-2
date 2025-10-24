import AttachmentIcon from "@mui/icons-material/Attachment";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import { useChat } from "../context/chatContext";

const InputArea: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const { typingMessage, sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 1000;

  const handleSend = () => {
    if (textareaValue.trim()) {
      sendMessage(textareaValue);
      setTextareaValue("");
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl max-h-3xl mx-auto p-2 pb-0 md:p-0 shrink-0 shadow-inner-border shadow-gray-500 shadow-md rounded-lg md:rounded-b-none flex flex-col">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={textareaValue}
          placeholder="Ask me a question..."
          className="w-auto m-3 p-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-0 max-h-60 overflow-y-auto disabled:bg-gray-100 shadow-md shadow-gray-300"
          rows={3}
          disabled={!!typingMessage} // Disable input while LLM is typing
          onChange={(e) => setTextareaValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        {/* Bottom bar*/}
        <div className="flex items-center justify-between px-4 py-3 border border-none border-gray-300 rounded-b-lg bg-white">
          {/* Left button */}
          <div className="flex gap-2">
            <button
              className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-500 hover:text-gray-900"
              aria-label="Attach file"
            >
              <AttachmentIcon />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-500 hover:text-gray-900"
              aria-label="Use camera"
            >
              <CameraAltIcon />
            </button>
          </div>

          {/* Right button */}
          <div className="flex items-center gap-3">
            <span
              className={`text-sm ${
                textareaValue.length <= maxLength
                  ? "text-gray-500"
                  : "text-red-500"
              }`}
            >
              {textareaValue.length}/{maxLength}
            </span>
            <button
              disabled={!textareaValue.trim() || !!typingMessage} // Disable send while typing
              className="p-2 bg-blue-500 hover:bg-blue-600  disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
              aria-label="Send"
              onClick={handleSend}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputArea;
