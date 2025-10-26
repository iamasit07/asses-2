import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { LargeLogo, Logo } from "../assets/svg/svg";
import SmsIcon from "@mui/icons-material/Sms";
import FolderIcon from "@mui/icons-material/Folder";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PublicIcon from "@mui/icons-material/Public";
import RecentChats from "./recentChat";
import { useChatHistory } from "../hooks/useChatHistory";
import useDebounce from "../hooks/debounce";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Link } from "react-router-dom";

interface TopSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
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

const TopSidebar: React.FC<TopSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const { recentChatData } = useChatHistory();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<typeof recentChatData>([]);
  const debouncedTerm = useDebounce<string>({ value: searchTerm, delay: 300 });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (debouncedTerm) {
      const filtered = recentChatData.filter((chat) =>
        chat.title.toLowerCase().includes(debouncedTerm.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(recentChatData);
    }
  }, [debouncedTerm, recentChatData]);

  const handleSelectChat = () => {
    setSearchTerm("");
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.relatedTarget as Node)
      ) {
        setIsSearchFocused(false);
      }
    }, 150);
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  return (
    <div
      className={`flex flex-col justify-start grow min-h-0 px-4 py-6 space-y-6 ${
        isCollapsed && "items-center"
      }`}
    >
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
        <div className="hidden md:block absolute top-1/20 -right-0.5 -translate-y-1/3 text-blue-600 transition-transform duration-300 bg-blue-100 border-none rounded-l-full pl-0.5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${isCollapsed ? "rotate-180" : ""}  `}
          >
            <ChevronLeftIcon />
          </button>
        </div>
      </div>
      {/* Search bar */}
      <div className="relative" ref={searchContainerRef} onBlur={handleBlur}>
        {!isCollapsed && (
          <div className="flex items-center bg-white p-1 rounded-2xl text-md text-gray-400">
            <div className="p-0.5">
              <SearchIcon />
            </div>
            <div className="p-0.5">
              <input
                placeholder="Search for chats..."
                className="w-full border-none outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
              />
            </div>
          </div>
        )}
        {/* Drop down list */}
        {isSearchFocused && filteredChats.length > 0 && !isCollapsed && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
            <ul className="py-1">
              {filteredChats.map((chat) => (
                <li key={chat.id}>
                  <Link
                    to={`/chat/${chat.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleSelectChat}
                  >
                    {chat.title}
                  </Link>
                </li>
              ))}
            </ul>
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
      {!isCollapsed && <RecentChats data={recentChatData} />}
    </div>
  );
};

export default TopSidebar;
