import { useState, type ReactNode } from "react";
import { UIContext } from "./uiContext";

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </UIContext.Provider>
  );
};
