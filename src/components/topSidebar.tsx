import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LargeLogo, Logo } from "../assets/svg/svg";
import SmsIcon from "@mui/icons-material/Sms";
import FolderIcon from "@mui/icons-material/Folder";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PublicIcon from "@mui/icons-material/Public";

interface TopSidebarProps {
  isCollapsed: boolean;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  shortcut: string;
  active: boolean;
}

const navItems: NavItem[] = [
  { icon: SmsIcon, label: "Home", shortcut: "⌘H", active: true },
  { icon: FolderIcon, label: "Library", shortcut: "⌘T", active: false },
  { icon: WatchLaterIcon, label: "History", shortcut: "⌘G", active: false },
  { icon: PublicIcon, label: "Explore", shortcut: "⌘L", active: false },
];

const recentChats: string[] = [
  "Write a Shakespearean sonnet about a cat that...",
  "If cereal commercials were directed by Christo...",
  "Renewable Energy Trends",
  "Describe a medieval jousting tournament wher...",
  "What would a job interview be like if aliens wer...",
  "Generate a rap battle between a sentient toaste...",
  "What if oxygen was actually a hallucinogen, and...",
  "Pitch a reality TV show where ghosts haunt infl...",
];

const TopSidebar: React.FC<TopSidebarProps> = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col grow min-h-0 px-4 py-6 space-y-6">
      {/* Logo with switch button  */}
      <div className="flex p-2">
        <div>
          <Logo />
        </div>
        {!isCollapsed && (
          <div className="m-2">
            <LargeLogo />
          </div>
        )}
      </div>
      {/* Search bar */}
      <div>
        {!isCollapsed && (
          <div className="flex items-center bg-white p-1 rounded-2xl text-md text-gray-400">
            <div className="p-0.5">
              <SearchIcon />
            </div>
            <div className="p-0.5">
              <input
                placeholder="Search for chats..."
                className="w-full border-none outline-none"
              ></input>
            </div>
          </div>
        )}
      </div>
      {/* itemlist */}
      <div>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-between p-1.5 rounded-xl hover:cursor-pointer ${
              item.active && !isCollapsed ? "bg-white" : ""
            }`}
          >
            <div className="flex items-center justify-center text-gray-400">
              <div
                className={` flex px-1 py-2 ${
                  item.active ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <span>
                  <item.icon />
                </span>
              </div>
              {!isCollapsed && (
                <div className="px-2 py-1">
                  <span>{item.label}</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="px-2 py-1 bg-gray-200 rounded-md text-xs text-gray-600">
                <span>{item.shortcut}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Previous Chats */}
      {!isCollapsed && (
        <div className="flex flex-col grow overflow-y-auto min-h-0">
          <div className="p-1 text-sm font-bold shrink-0">
            <span>Recent Chats</span>
          </div>
          <div className="flex flex-col shrink-0">
            {recentChats.map((chat, index) => (
              <button
                key={index}
                className="text-xs font-medium text-gray-500 decoration-none pl-4 px-2 py-2 text-left truncate hover:bg-white rounded-xl cursor-pointer whitespace-nowrap"
              >
                <span>{chat}</span>
              </button>
            ))}
          </div>
          <div className="shrink-0">
            <button className="text-sm text-blue-500 decoration-none p-1.5 text-left hover:bg-white rounded-xl cursor-pointer flex items-center">
              View All <ArrowForwardIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSidebar;
