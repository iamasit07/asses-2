import { useState } from "react";
import { CollapseLogo, DownArrow } from "../assets/svg/svg";
import TopSidebar from "./topSidebar";
import BottomSidebar from "./bottomSidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile view button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white border rounded-lg shadow-md"
      >
        <DownArrow />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* sidebar panel */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col h-screen bg-blue-50 transition-all duration-300 border-r border-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "md:w-24" : "md:w-80"} w-64`}
      >
        <div className="flex flex-col grow min-h-0 border-none">
          <TopSidebar isCollapsed={isCollapsed} />
          <BottomSidebar isCollapsed={isCollapsed} />
        </div>

        {/* Desktop collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute top-1/18 -right-3 transform -translate-y-1/2 bg-white border border-white rounded-full p-1 hover:shadow-lg transition-shadow"
        >
          <CollapseLogo isCollapsed={isCollapsed} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
