import DocCard from "./docCard";
import ImageCard from "./imageCard";

interface AttachmentDisplayProps {
  files: File[];
}

// Helper to check if a file is an image
const isImage = (file: File) => file.type.startsWith("image/");

const AttachmentDisplay = ({ files }: AttachmentDisplayProps) => {
  if (!files || files.length === 0) {
    return null;
  }

  // Split files into images and other documents
  const imageFiles = files.filter(isImage);
  const docFiles = files.filter((file) => !isImage(file));

  return (
    <div className="mt-2 flex p-2 flex-col gap-3">
      {/* Render Image Cards in a grid */}
      {imageFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {imageFiles.map((file, index) => (
            <ImageCard key={index} file={file} />
          ))}
        </div>
      )}

      {/* Render Document Cards */}
      {docFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {docFiles.map((file, index) => (
            <DocCard key={index} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentDisplay;
