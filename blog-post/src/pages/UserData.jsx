import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa6";

const UserData = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const optionRefs = useRef([]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { user, authToken, logout } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  //pagenation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  // fetching useR data
  useEffect(() => {
    const fetchUserData = async (page) => {
      setLoading(true); //Starts loading here
      try {
        const response = await axios.get(
          "https://twincles.mavenerp.in/api/public/api/users",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setUserData(response.data);
        console.log(response.data, "UserData");
      } catch (error) {
        console.error("Error fetching User Data:", error);
      } finally {
        setLoading(false); // stops loading aftet gtting the post
      }
    };

    fetchUserData();
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
      if (
        optionRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-6 py-3  bg-[#0072CE] shadow-sm rounded-2xl">
        <h1 className="text-white text-sm md:text-xl lg:text-2xl font-sans font-medium">User Data</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 p-1 bg-amber-500 rounded-full  hover:bg-blue-500  active:bg-sky-600 active:text-white transition"
          >
            <VscAccount className="text-2xl text-white" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-sky-700  shadow-2xl rounded-xl overflow-hidden z-50">
              <div className="px-4 py-2 border-b">
                <p className="text-xs text-gray-50">Signed in as</p>
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name || "User"}
                </p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-300 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
              >
                <IoLogOutOutline className="text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 mt-2">
        <div className="border border-gray-300 w-full p-4 rounded-2xl bg-gray-100 mt-5 ">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form className="w-full lg:w-[500px]">
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                  placeholder="Search"
                  required
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-6 px-4">
        <table className="w-full text-sm text-left text-gray-600 bg-gray-2 shadow rounded-xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {userData?.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-sky-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.location}</td>
                  <td className="px-6 py-4">{user.services}</td>
                  <td className="px-6 py-4">{user.mobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  {isLoading ? "Loading..." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
            <span>
            Page {currentPage} of {totalPages}
          </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserData;
