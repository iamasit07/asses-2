import { useContext } from "react";
import { UIContext, type UIContextType } from "../context/uiContext";

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
