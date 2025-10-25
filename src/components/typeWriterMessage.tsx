import useTypewriter from "../hooks/typewriter";

interface TypewriterMessageProps {
  message: string;
}

const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ message }) => {
  const { displayedText } = useTypewriter(message);

  return (
    <div className=" flex flex-col items-start">
      <div className="text-gray-700">
        <p style={{ whiteSpace: "pre-wrap" }}>{displayedText}</p>
      </div>
    </div>
  );
};

export default TypewriterMessage;
