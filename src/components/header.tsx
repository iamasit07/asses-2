import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ShareIcon from "@mui/icons-material/Share";
import HelpIcon from "@mui/icons-material/Help";
import AddIcon from "@mui/icons-material/Add";
import {
  ChatGPTLogo,
  ClaudeLogo,
  CopilotLogo,
  DownArrow,
  GeminiLogo,
} from "../assets/svg/svg";
import { useChat } from "../context/chatContext";

const Header = ({ title }: { title: string | null }) => {
  const { activeLLM, setActiveLLM } = useChat();
  return (
    <>
      <div className="w-full Sshrink-0">
        <div className="flex justify-between h-20 w-full items-center p-2">
          {/* LLM's Selection choice */}
          <div className="flex items-center justify-center pb-2">
            <FormControl size="small" sx={{ width: 160, height: 40 }}>
              <Select
                value={activeLLM}
                onChange={(e) => setActiveLLM(e.target.value)}
                size="small"
              >
                <MenuItem value={"chatgpt"}>
                  <div className="flex items-center">
                    <div className="flex p-2">
                      <ChatGPTLogo />
                    </div>
                    <div className="ml-0.5">
                      <span className="">ChatGPT</span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem value={"claude"}>
                  <div className="flex items-center">
                    <div className="flex p-2">
                      <ClaudeLogo />
                    </div>
                    <div className="ml-0.5">
                      <span className="">Claude</span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem value={"copilot"}>
                  <div className="flex items-center">
                    <div className="flex p-2">
                      <CopilotLogo />
                    </div>
                    <div className="ml-0.5">
                      <span className="">Copilot</span>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem value={"gemini"}>
                  <div className="flex items-center">
                    <div className="flex p-2">
                      <GeminiLogo />
                    </div>
                    <div className="ml-0.5">
                      <span className="">Gemini</span>
                    </div>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {!(title === "") && (
            <div className="flex items-center text-md ">
              {title}
              <div className="ml-1.5">
                <DownArrow />
              </div>
            </div>
          )}
          <div className="flex m-2">
            <div className="flex items-center cursor-pointer p-4 text-gray-500">
              <ShareIcon />
            </div>
            <div className="flex items-center cursor-pointer p-4 text-gray-500">
              <HelpIcon />
            </div>
            <div className="flex justify-center h-screen p-4 m-2 cursor-pointer bg-blue-500 text-white rounded-3xl max-h-10">
              <div className="flex items-center">
                <AddIcon />
              </div>
              <div className="pl-2 h-full flex items-center">
                <button className="flex text-left cursor-pointer">
                  <span className="text-sm">New Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-gray-200"></div>
      </div>
    </>
  );
};

export default Header;
