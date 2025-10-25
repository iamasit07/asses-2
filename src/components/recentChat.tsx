import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

interface RecentChatsProps {
  data: {
    title: string;
    id: string;
  }[];
}

const RecentChats = ({ data }: RecentChatsProps) => {
  return (
    <>
      <div className="flex flex-col grow overflow-y-auto min-h-0">
        <div className="p-1 text-sm font-bold shrink-0">
          <span>Recent Chats</span>
        </div>
        <div className="flex flex-col shrink-0">
          {data.map((chat: { title: string; id: string }) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className="text-xs font-medium text-gray-500 decoration-none pl-4 px-2 py-2 text-left truncate hover:bg-white rounded-xl cursor-pointer whitespace-nowrap"
            >
              <span>{chat.title}</span>
            </Link>
          ))}
        </div>
        <div className="shrink-0">
          <button className="text-sm text-blue-500 decoration-none p-1.5 text-left hover:bg-white rounded-xl cursor-pointer flex items-center">
            View All <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecentChats;
