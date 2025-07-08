import React from "react";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSidebar } from "react-icons/fi";

const Sidebar = () => {

    
  return (
    <div>
       {/* <div className="shadow-xl h-screen w-[50px] border-e border-t border-gray-400 p-3">
            <div className=" flex flex-col items-center gap-4  mt-5">
        
        <button className="b hover:bg-gray-50 p-1 rounded-xl">
      <FiSidebar className="text-black text-xl" />
      
    </button>

    <button className="b hover:bg-gray-50 p-1 rounded">
      <LuNewspaper className="text-black text-xl" />
    </button>


     <button className="b hover:bg-gray-50 p-1 rounded">
      <MdOutlinePeopleAlt className="text-black text-xl" />
    </button>

    <button className="b hover:bg-gray-50 p-1 rounded">
      <IoSettingsOutline className="text-black text-xl" />
    </button>


      </div>
        </div>  */}

      <div className="shadow-xl h-screen w-[250px] border-e border-t border-gray-400 p-3">
        <div className=" flex justify-between items-center p-3 ">
          <h1 className="text-xl  font-sans font-medium text-shadow-sm ">
            Twincles
          </h1>
          <button className="b hover:bg-gray-50 p-1 rounded-xl">
            <FiSidebar className="text-black text-xl" />
          </button>
        </div>
        <div className="flex flex-col">
          <a
            href="#"
            className="hover:bg-gray-200 p-3 rounded-2xl font-sans flex items-center gap-2   "
          >
            <LuNewspaper className="" />
            Blog Post
          </a>
          <a
            href="#"
            className="hover:bg-gray-200 p-3 rounded-2xl font-sans flex items-center gap-2"
          >
            <MdOutlinePeopleAlt />
            Analytics
          </a>
          <a
            href="#"
            className="hover:bg-gray-200 p-3 rounded-2xl font-sans flex items-center gap-2"
          >
            <IoSettingsOutline />
            Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
