import Avatar from "@mui/material/Avatar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface BottomSidebarProps {
  isCollapsed: boolean;
}

const BottomSidebar: React.FC<BottomSidebarProps> = ({ isCollapsed }) => {
  return (
    <>
      <div className="px-4 py-4 border-t border-gray-200">
        <div
          className={`flex justify-center md:justify-between bg-linear-to-r from-pink-100 to-blue-100 rounded-md mb-4 ${
            isCollapsed
              ? "flex-col items-center p-1"
              : "flex-row items-center p-4"
          }`}
        >
          <div className="p-1">
            <div
              className={`flex items-center justify-between ${
                isCollapsed ? "" : "mb-1"
              }`}
            >
              <span
                className={`${
                  isCollapsed ? "text-xs" : "text-sm"
                } font-bold text-blue-800`}
              >
                Try Pro
              </span>
            </div>
            {!isCollapsed && (
              <p className="text-xs text-blue-700 mt-1">
                Upgrade for smarter AI and more...
              </p>
            )}
          </div>
          {!isCollapsed && (
            <div>
              <button className="text-blue-400 rounded-md px-2 py-1 text-sm">
                <RocketLaunchIcon fontSize="small" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center px-4 py-2 hover:cursor-pointer">
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          {!isCollapsed && (
            <div className="ml-2">
              <span className="font-bold">John Doe</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomSidebar;
