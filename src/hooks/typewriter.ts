import { useEffect, useState } from "react";

const useTypewriter = (text: string) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsDone(false);
  }, [text]);

  useEffect(() => {
    if (!text) {
      setIsDone(true);
      return;
    }

    const words = text.split(" ");

    if (currentIndex >= words.length) {
      setIsDone(true);
      return;
    }

    const timer = setTimeout(() => {
      const newText = words.slice(0, currentIndex + 1).join(" ");
      setDisplayedText(newText);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 70);

    return () => clearTimeout(timer);
  }, [text, currentIndex]);

  return { displayedText, isDone };
};

export default useTypewriter;
