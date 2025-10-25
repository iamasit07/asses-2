import React from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

// Define the props this component will accept
interface AttachmentPopupProps {
  isOpen: boolean;
  files: File[];
  onDeleteOne: (index: number) => void;
  onDeleteAll: () => void;
  onAddFiles: () => void;
}

const AttachmentPopup: React.FC<AttachmentPopupProps> = ({
  isOpen,
  files,
  onDeleteOne,
  onDeleteAll,
  onAddFiles,
}) => {
  // If not open, render nothing
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 mb-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">
      {/* Popup Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Attached Files</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onDeleteAll}
            className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100"
            title="Delete all"
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            onClick={onAddFiles}
            className="text-sm font-medium text-blue-500 hover:text-blue-700"
          >
            Add +
          </button>
        </div>
      </div>

      {/* Popup File List */}
      <div className="p-2 max-h-48 overflow-y-auto">
        {files.length === 0 ? (
          <p className="text-center text-sm text-gray-400 p-4">
            No files attached.
          </p>
        ) : (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-700"
              >
                <div className="flex items-center overflow-hidden">
                  <AttachmentIcon
                    sx={{ fontSize: 16 }}
                    className="text-gray-400 shrink-0 mr-2"
                  />
                  <span className="truncate" title={file.name}>
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteOne(index)}
                  className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 shrink-0 ml-2"
                  title="Delete file"
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AttachmentPopup;
