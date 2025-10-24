import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewChat from "./pages/newChat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewChat />}></Route>
      </Routes>
    </>
  );
}

export default App;
