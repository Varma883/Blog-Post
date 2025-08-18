import React, { useState } from "react";
import { LuNewspaper } from "react-icons/lu";
import { FaCompassDrafting, FaRegEye, FaUsers } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import logoImage from "../assets/logo-twincles-DWipzVLA.png"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (pathOrStatus) => {
    const currentStatus = new URLSearchParams(location.search).get("status");
    const currentPath = location.pathname;

    if (pathOrStatus === "all") {
      return currentPath === "/post" && !currentStatus;
    }

    if (["published", "draft", "archived"].includes(pathOrStatus)) {
      return currentPath === "/post" && currentStatus === pathOrStatus;
    }

    return currentPath === pathOrStatus;
  };

  const menuItems = [
    {
      icon: <LuNewspaper className="text-xl" />,
      label: "All Post",
      to: "/post",
      status: "all",
    },
    {
      icon: <FaRegEye className="text-xl" />,
      label: "Published",
      to: "/post?status=published",
      status: "published",
    },
    {
      icon: <FaCompassDrafting className="text-xl" />,
      label: "Draft",
      to: "/post?status=draft",
      status: "draft",
    },
    {
      icon: <RiInboxArchiveLine className="text-xl" />,
      label: "Archive",
      to: "/post?status=archived",
      status: "archived",
    },
  
    {
      icon: <FaUsers className="text-xl" />,
      label: "User Data",
      to: "/userdata",
    },
  ];

  return (
    <div className="hidden md:block h-screen bg-[#F4F7FA] overflow-hidden">
      <div
        className={`h-full rounded-xl border-e bg-sky-700 border-gray-400 p-3 shadow-2xl transition-all duration-300 ${
          isOpen ? "w-[250px]" : "w-[60px]"
        } flex flex-col justify-between relative`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            {isOpen && (
              <img
                src={logoImage }
                className="w-[150px] rounded-2xl"
                alt="img"
              />
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-blue-500 active:bg-sky-600 active:text-white"
            >
              <FiSidebar className="text-white text-xl" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="mt-6 flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                  isActive(item.status || item.to)
                    ? "bg-blue-500 text-white"
                    : "text-white hover:bg-blue-500"
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="w-full">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full ${
              isOpen ? "justify-start gap-3 px-4" : "justify-center"
            } bg-amber-500 text-white hover:bg-blue-500 py-2 rounded-xl transition`}
          >
            <IoLogOutOutline className="text-xl" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
