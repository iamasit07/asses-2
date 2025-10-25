import { useEffect, useState } from "react";

const useTypewriter = (text: string) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Effect to reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsDone(false);
  }, [text]);

  // Effect for typing logic (word-by-word)
  useEffect(() => {
    // Stop if text is empty
    if (!text) {
      setIsDone(true);
      return;
    }

    const words = text.split(" ");

    // Stop if we are done
    if (currentIndex >= words.length) {
      setIsDone(true);
      return;
    }

    // The timer for the next word
    const timer = setTimeout(() => {
      // Get all words up to the current index
      const newText = words.slice(0, currentIndex + 1).join(" ");
      setDisplayedText(newText);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 70);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [text, currentIndex]);

  return { displayedText, isDone };
};

export default useTypewriter;
