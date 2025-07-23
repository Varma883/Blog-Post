import React, { useState } from "react";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSidebar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
    const {logout}=useAuth()
  const navigate = useNavigate()
 
  const handleLogout = () => {
    logout();
    
    toast.info("Logged out successfully");

  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>

      <div className="hidden md:block h-screen">
        <div
          className={`h-screen border-e border-t border-gray-400 p-3 shadow-xl transition-all duration-300
        ${isOpen ? "w-[250px]" : "w-[60px]"} 
       block sm:flex flex-col justify-between`}
        >
          {/* Top Section */}
          <div>
            <div className="flex items-center justify-between">
              {isOpen && (
                <h1 className="text-xl font-sans font-medium">Twincles</h1>
              )}
              <button
                onClick={toggleSidebar}
                className="hover:bg-gray-100 p-1 rounded-xl"
              >
                <FiSidebar className="text-black text-xl" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="mt-10 flex flex-col gap-2">
              <Link
                to={"/post"}
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl"
              >
                <LuNewspaper className="text-xl" />
                {isOpen && <span>Blog Post</span>}
              </Link>
              <a
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl"
              >
                <MdOutlinePeopleAlt className="text-xl" />
                {isOpen && <span>Analytics</span>}
              </a>
              <a
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl"
              >
                <IoSettingsOutline className="text-xl" />
                {isOpen && <span>Settings</span>}
              </a>
              <a
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl"
                 onClick={handleLogout}
              >
                <IoLogOutOutline className="text-xl" />
                {isOpen && <span>Logout</span>}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
