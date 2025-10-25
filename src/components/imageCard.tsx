import { useState, useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";

interface ImageCardProps {
  file: File;
}

const ImageCard = ({ file }: ImageCardProps) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    console.log("Created URL:", url);

    // Clean up the URL when the component unmounts
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-md">
      <img
        src={imageUrl}
        alt={file.name}
        className="h-full w-full object-cover"
      />
      <a
        href={imageUrl}
        download={file.name}
        className="absolute top-2 right-2 p-1.5 bg-linear-to-r from-pink-50 to-blue-50 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Download image"
      >
        <DownloadIcon fontSize="small" />
      </a>
    </div>
  );
};

export default ImageCard;
