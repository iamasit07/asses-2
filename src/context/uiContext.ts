import { createContext, type Dispatch, type SetStateAction } from "react";

export interface UIContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);
