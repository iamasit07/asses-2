import useTypewriter from "../hooks/typewriter";
import ArticleIcon from "@mui/icons-material/Article";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface TypewriterMessageProps {
  message: string;
  delay: number;
}

const TypewriterMessage: React.FC<TypewriterMessageProps> = ({
  message,
  delay,
}) => {
  const { displayedText } = useTypewriter(message, delay);

  return (
    <div className="flex flex-col items-start">
      <div
        className={`p-3 rounded-lg max-w-2xl shadow-md bg-blue-500 text-white`}
      >
        {/* "5 Resources" section - matching the LLM output structure */}
        <div className="flex items-center space-x-1 text-sm text-gray-500 ml-1">
          <ArticleIcon fontSize="small" />
          <span>5 Resources</span>
        </div>
        {/* The typewriter text */}
        <p style={{ whiteSpace: "pre-wrap" }}>{displayedText}</p>
        <div>
          {/* Action Buttons - matching the LLM output structure */}
          {/* These buttons will be present but not interactive during typing */}
          <div className="flex items-center space-x-2 text-gray-500 mt-2 ml-1">
            <button className="p-1 rounded-md">
              <ThumbUpOutlinedIcon fontSize="small" />
            </button>
            <button className="p-1 rounded-md">
              <ThumbDownOutlinedIcon fontSize="small" />
            </button>
            <button className="p-1 rounded-md">
              <ContentCopyIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypewriterMessage;
