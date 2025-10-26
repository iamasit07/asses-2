import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./context/uiProvider.tsx";
import { ChatHistoryProvider } from "./context/chatHistoryProvider.tsx";
import { ChatSessionProvider } from "./context/chatSessionProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <ChatHistoryProvider>
          <ChatSessionProvider>
            <App />
          </ChatSessionProvider>
        </ChatHistoryProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>
);
