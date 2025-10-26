import { useState } from "react";
import { useUI } from "../hooks/useUI";
import TopSidebar from "./topSidebar";
import BottomSidebar from "./bottomSidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useUI();

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && ( // Use state from context
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)} // Use setter from context
        ></div>
      )}

      {/* sidebar panel */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col h-screen bg-blue-50 transition-all duration-300 border-r border-white ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "md:w-24" : "md:w-80"} w-80`}
      >
        <div className="flex flex-col grow min-h-0 border-none">
          <TopSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <BottomSidebar isCollapsed={isCollapsed} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
