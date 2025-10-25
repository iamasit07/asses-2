import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ShareIcon from "@mui/icons-material/Share";
import HelpIcon from "@mui/icons-material/Help";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ChatGPTLogo,
  ClaudeLogo,
  CopilotLogo,
  DownArrow,
  GeminiLogo,
} from "../assets/svg/svg";
import { useChat } from "../context/chatContext";
import { Link } from "react-router-dom";

const Header = ({ title }: { title: string | null }) => {
  const {
    activeLLM,
    setActiveLLM,
    setIsSidebarOpen,
    setMessages,
    setTypingMessage,
  } = useChat();

  return (
    <div className="w-full shrink-0 bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center h-16 px-4 md:px-6">
        {/* Left Section - Menu & LLM Selection */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={activeLLM}
              onChange={(e) => setActiveLLM(e.target.value)}
              size="small"
              sx={{
                borderRadius: "12px",
              }}
            >
              <MenuItem value="chatgpt">
                <div className="flex items-center gap-2">
                  <ChatGPTLogo />
                  <span className="text-sm font-medium">ChatGPT</span>
                </div>
              </MenuItem>
              <MenuItem value="claude">
                <div className="flex items-center gap-2">
                  <ClaudeLogo />
                  <span className="text-sm font-medium">Claude</span>
                </div>
              </MenuItem>
              <MenuItem value="copilot">
                <div className="flex items-center gap-2">
                  <CopilotLogo />
                  <span className="text-sm font-medium">Copilot</span>
                </div>
              </MenuItem>
              <MenuItem value="gemini">
                <div className="flex items-center gap-2">
                  <GeminiLogo />
                  <span className="text-sm font-medium">Gemini</span>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Center Section - Chat Title */}
        {title && title !== "" && (
          <div className="flex items-center gap-1.5 text-sm md:text-base font-medium text-gray-800 truncate max-w-xs md:max-w-md">
            <span className="truncate">{title}</span>
            <DownArrow />
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Share chat"
          >
            <ShareIcon fontSize="small" />
          </button>

          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Help"
          >
            <HelpIcon fontSize="small" />
          </button>

          <Link
            to="/new-chat"
            onClick={() => {
              setMessages([]);
              setTypingMessage(null);
            }}
            className="ml-2 flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-sm hover:shadow-md"
          >
            <AddIcon fontSize="small" />
            <span className="hidden md:inline text-sm font-medium">
              New Chat
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};

export default Header;
