interface DocCardProps {
  file: File;
}

const getDocColor = (ext: string) => {
  if (ext === "PDF") return "text-fuchsia-500";
  if (ext === "DOCX" || ext === "DOC") return "text-blue-700";
  return "text-gray-500";
};

const DocCard = ({ file }: DocCardProps) => {
  const fileExt = file.name.split(".").pop()?.toUpperCase() || "FILE";
  const color = getDocColor(fileExt);

  return (
    <a
      href={URL.createObjectURL(file)}
      download={file.name}
      className="flex items-center p-3 w-60 bg-linear-to-r from-pink-50 to-blue-50 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <div className={`mr-3 text-md ${color}`}>{fileExt}</div>
      <div className="overflow-hidden">
        <div className={`text-sm font-semibold ${color}`}>{fileExt}</div>
        <div className="text-sm text-gray-700 truncate" title={file.name}>
          {file.name}
        </div>
      </div>
    </a>
  );
};

export default DocCard;
