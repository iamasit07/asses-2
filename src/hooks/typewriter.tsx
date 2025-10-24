import { useEffect, useState } from "react";

const useTypewriter = (text: string, delay: number) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Effect to reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsDone(false);
  }, [text]);

  // Effect for typing logic
  useEffect(() => {
    const words = (text || "").split(" ");

    if (currentIndex >= words.length) {
      setIsDone(true);
      return;
    }

    const timer = setTimeout(() => {
      const newText = words.slice(0, currentIndex + 1).join(" ");
      setDisplayedText(newText);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, currentIndex]);

  return { displayedText, isDone };
};

export default useTypewriter;
