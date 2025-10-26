import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useState } from "react";
import { useChatSession } from "../hooks/useChatSession";

interface SuggestionCardProps {
  title: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title }) => {
  const { startNewChat } = useChatSession();
  const [onFocus, setOnFocus] = useState(false);

  const handleSend = () => {
    if (title.trim()) {
      startNewChat(title, [] as File[]);
    }
  };

  return (
    <>
      <button
        onClick={handleSend}
        onMouseEnter={() => {
          setOnFocus(true);
        }}
        onMouseLeave={() => {
          setOnFocus(false);
        }}
        className="w-full text-left"
      >
        <div className="relative">
          <div
            className={`flex flex-col items-center justify-between h-full min-h-56 w-full p-4 rounded-2xl bg-linear-to-r from-pink-50 to-blue-50 border-gray-200 cursor-pointer hover:border-blue-500 hover:border transition-all`}
          >
            <div className="flex items-start justify-center">
              <div
                className={`flex items-center justify-center p-2 h-12 w-12 border rounded-full absolute left-2 right-2 top-2 ${
                  onFocus
                    ? "text-white bg-blue-500"
                    : "bg-white text-blue-300 border-gray-200"
                }`}
              >
                <AutoAwesomeIcon />
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900 leading-relaxed">
              {title}
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default SuggestionCard;
