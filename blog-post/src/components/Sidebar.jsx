import React, { useState } from "react";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSidebar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdOutlineArchive } from "react-icons/md";
import { FaCompassDrafting } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.info("Logged out successfully");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="hidden md:block h-screen bg-[#F4F7FA] ">
        <div
          className={`h-screen rounded-xl border-e bg-sky-700  border-gray-400 p-3 shadow-2xl transition-all duration-300
        ${isOpen ? "w-[250px]" : "w-[60px]"} 
       block sm:flex flex-col justify-between`}
        >
          {/* Top Section */}
          <div>
            <div className="flex items-center justify-between">
              {isOpen && (
                // <h1 className="text-xl font-sans font-medium">Twincles</h1>
                <img
                  src="https://twincles.com/wp-content/uploads/2025/01/cropped-cropped-Untitled-design-33-300x100.png"
                  className="w-38 rounded-2xl"
                  alt="img"
                />
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-blue-500  active:bg-sky-600 active:text-white"
              >
                <FiSidebar className=" text-white text-xl" />
              </button>
            </div>

            {/* Menu Items */}

            <div className="relative ">
              <div className="mt-10 flex flex-col gap-2">
                <Link
                  to={"/post"}
                  href="#"
                  className="flex items-center gap-3 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl"
                >
                  <LuNewspaper className="text-xl" />
                  {isOpen && <span>All Post</span>}
                </Link>

                <Link
                  to={"/published"}
                  href="#"
                  className="flex items-center gap-3 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl"
                >
                  <FaRegEye className="text-xl" />
                  {isOpen && <span>Published</span>}
                </Link>

                <Link
                  to={"/draft"}
                  href="#"
                  className="flex items-center gap-3 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl"
                >
                  <FaCompassDrafting className="text-xl" />
                  {isOpen && <span>Draft</span>}
                </Link>

                {/* <Link
                  to={"/archive"}
                  href="#"
                  className="flex items-center gap-3 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl"
                >
                  <MdOutlineArchive className="text-xl" />
                  {isOpen && <span>Archived</span>}
                </Link> */}

                <Link
                  to={"/userdata"}
                  href="#"
                  className="flex items-center gap-3 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl"
                >
                  <FaUsers className="text-xl" />
                  {isOpen && <span>User Data</span>}
                </Link>
              </div>
            </div>
            <div className="absolute bottom-5 w-full">
              <button
                onClick={handleLogout}
                className={`flex items-center ${
                  isOpen ? "justify-start gap-3 px-16" : "justify-center px-2"
                } bg-amber-500 text-white hover:bg-blue-500 p-2 active:bg-sky-600 active:text-white rounded-xl transition`}
              >
                <IoLogOutOutline className="text-xl" />
                {isOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
