import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachmentDisplay from "./attachmentArea";
import type { Message } from "../types/chat.type";

interface UserReplyProps {
  msg: string;
  index: number;
  messages: Message[];
}

const UserReply = ({ msg, messages, index }: UserReplyProps) => {
  return (
    <div className="flex items-start space-x-2">
      <AccountCircleIcon
        style={{ fontSize: 40 }}
        className="text-blue-200 mt-1"
      />
      <div
        className={`p-3 rounded-lg max-w-2xl shadow-md bg-indigo-100 text-gray-900`}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{msg}</p>
        <AttachmentDisplay files={messages[index].files || []} />
      </div>
    </div>
  );
};

export default UserReply;
