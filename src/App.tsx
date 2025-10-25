import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NewChat from "./pages/newChat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/new-chat" element={<NewChat />} />
        <Route path="/chat/:chatId" element={<NewChat />} />
        <Route path="/" element={<Navigate to="/new-chat" />} />
      </Routes>
    </>
  );
}

export default App;
