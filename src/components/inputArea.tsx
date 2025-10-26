import AttachmentIcon from "@mui/icons-material/Attachment";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useChat } from "../context/chatContext";
import AttachmentPopup from "./fileAttachmentPopup";
import { useNavigate, useParams } from "react-router-dom";

const InputArea: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const { typingMessage, sendMessage, startNewChat } = useChat();
  const navigate = useNavigate();
  const { chatId } = useParams();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 1000;

  const [files, setFiles] = useState<File[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const attachmentWrapperRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;
    const filesArray = Array.from(newFiles);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const newFiles = e.dataTransfer ? e.dataTransfer.files : null;
      if (newFiles && newFiles.length > 0) {
        addFiles(newFiles);
        setIsPopupOpen(true);
      }
    },
    [addFiles]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      if (e.target !== textareaRef.current) {
        const newFile = e.clipboardData ? e.clipboardData.files : null;
        if (newFile && newFile.length > 0) {
          addFiles(newFile);
          setIsPopupOpen(true);
        }
      }
    },
    [addFiles]
  );

  const handleDeleteOne = (indexToDelete: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleDeleteAll = () => {
    setFiles([]);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attachmentWrapperRef.current &&
        !attachmentWrapperRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const rootEl = rootRef.current;
    const textareaEl = textareaRef.current;

    if (rootEl) {
      rootEl.addEventListener("dragover", handleDragOver);
      rootEl.addEventListener("dragleave", handleDragLeave);
      rootEl.addEventListener("drop", handleDrop);
    }

    if (textareaEl) {
      textareaEl.addEventListener("paste", handlePaste);
    }

    return () => {
      if (rootEl) {
        rootEl.removeEventListener("dragover", handleDragOver);
        rootEl.removeEventListener("dragleave", handleDragLeave);
        rootEl.removeEventListener("drop", handleDrop);
      }
      if (textareaEl) {
        textareaEl.removeEventListener("paste", handlePaste);
      }
    };
  }, [handleDragOver, handleDragLeave, handleDrop, handlePaste]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaValue]);

  const handleSend = () => {
    if (!chatId) {
      const newChatId = startNewChat(textareaValue.trim(), files);
      navigate(`/chat/${newChatId}`);
      setTextareaValue("");
      setFiles([]);
    } else {
      sendMessage(textareaValue.trim(), files);
      setTextareaValue("");
      setFiles([]);
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={onFileChange}
        className="hidden"
      />

      <div
        ref={rootRef}
        className="w-full max-w-4xl max-h-3xl mx-auto p-2 pb-0 md:p-0 shrink-0 shadow-inner-border shadow-gray-400 shadow-md rounded-2xl md:rounded-b-none flex flex-col relative"
      >
        <textarea
          ref={textareaRef}
          value={textareaValue}
          placeholder="Ask me a question..."
          className="w-auto m-3 p-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-0 max-h-60 overflow-y-auto disabled:bg-gray-100 shadow-md shadow-gray-200"
          disabled={!!typingMessage}
          onChange={(e) => setTextareaValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="flex items-center justify-between px-4 py-3 border border-none border-gray-300 rounded-b-lg bg-white">
          <div className="flex gap-2">
            <div className="relative" ref={attachmentWrapperRef}>
              {/* --- Render the new component here --- */}
              <AttachmentPopup
                isOpen={isPopupOpen}
                files={files}
                onDeleteOne={handleDeleteOne}
                onDeleteAll={handleDeleteAll}
                onAddFiles={handleAddClick}
              />

              <button
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className={`flex items-center justify-center p-2 rounded-full transition-colors ${
                  isPopupOpen || files.length > 0
                    ? "bg-blue-200 text-blue-600"
                    : "text-gray-500  hover:text-gray-900 bg-gray-200"
                }`}
                aria-label="Attach file"
              >
                <AttachmentIcon />
                {files.length > 0 && (
                  <span className="p-1 text-blue-500">{files.length}</span>
                )}
              </button>
            </div>

            <div>
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="p-2 rounded-full bg-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
                aria-label="Open camera"
              >
                <CameraAltIcon />
              </button>
            </div>
          </div>

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
              disabled={
                (!textareaValue.trim() && files.length === 0) || !!typingMessage
              }
              className="p-2 bg-blue-500 hover:bg-blue-600  disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
              aria-label="Send"
              onClick={handleSend}
            >
              <SendIcon />
            </button>
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 rounded-lg">
            <div className="w-full h-full border-4 border-dashed border-white rounded-lg flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">
                Drop files to attach
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputArea;
