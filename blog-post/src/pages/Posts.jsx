import React, { use, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAutherOpen, setIsAutherOpen] = useState(false);
  const navigate = useNavigate();

  // Dummy data
  const posts = [
    {
      id: 1,
      title: "Noteworthy technology acquisitions 2021",
      status: "PUBLISHED",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },
    {
      id: 2,
      title: "Noteworthy technology acquisitions 2021",
      status: "DRAFT",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },
    {
      id: 3,
      title: "Noteworthy technology acquisitions 2021",
      status: "PUBLISHED",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },
    {
      id: 4,
      title: "Noteworthy technology acquisitions 2024 ",
      status: "ARCHIVED",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },
    {
      id: 5,
      title: "Noteworthy technology acquisitions 2024 ",
      status: "ARCHIVED",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },

    {
      id: 6,
      title: "Noteworthy technology acquisitions 2024 ",
      status: "PUBLISHED",
      author: "John Doe",
      created: "2024-10-26",
      updated: "2025-04-20",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500";
      case "DRAFT":
        return "bg-gray-400";
      case "ARCHIVED":
        return "bg-red-400";
      default:
        return "bg-gray-300";
    }
  };
  const DisplayDeatils = (id) => {
    console.log("Navigating to:", `/post/view/${id}`);
    navigate("/post/view/" + id);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
        <h1 className="text-sm md:text-xl lg:text-2xl font-sans font-medium">
          Blog Post
        </h1>
        <Link
          to="/create"
          className="text-white flex items-center text-center gap-2 lg:gap-3 font-medium rounded-lg text-xs px-2 py-1.5 lg:text-sm lg:px-4 lg:py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          <FaPlus />
          Create New Post
        </Link>
      </div>

      <div className="p-3 mt-2">
        <div className="border border-gray-300 w-full p-4 rounded-2xl bg-gray-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <form className="w-full lg:w-[500px]">
              <label htmlFor="default-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
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
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search posts..."
                  required
                />
              </div>
            </form>

            {/* Filters Section */}
            <div className="flex gap-3 justify-between">
              {/* Status Filter */}
              <div
                className="relative"
                onMouseEnter={() => setIsStatusOpen(true)}
                onMouseLeave={() => setIsStatusOpen(false)}
              >
                <button
                  type="button"
                  className="text-gray-900 border border-gray-300 bg-gray-50 focus:ring-gray-400 focus:border-gray-400 font-medium rounded-lg text-[10px] lg:text-sm px-3 py-2 inline-flex items-center"
                >
                  All Statuses
                  <svg
                    className="w-2.5 h-2.5 ms-2"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isStatusOpen && (
                  <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href=""
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Published
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Draft
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Archived
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Author Filter */}
              <div
                className="relative"
                onMouseEnter={() => setIsAutherOpen(true)}
                onMouseLeave={() => setIsAutherOpen(false)}
              >
                <button
                  type="button"
                  className="text-gray-900 border border-gray-300 bg-gray-50 focus:ring-gray-400 focus:border-gray-400 font-medium lg rounded-lg text-[10px] lg:text-sm px-3 py-2 inline-flex items-center"
                >
                  All Authors
                  <svg
                    className="w-2.5 h-2.5 ms-2"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isAutherOpen && (
                  <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          John Doe
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Emily Smith
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              <div>
                <button
                  type="button"
                  className="text-gray-400 border border-gray-300 bg-gray-50 focus:ring-gray-400 focus:border-gray-400 font-medium rounded-lg text-[10px] lg:text-sm px-3 py-2 inline-flex items-center"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* flex flex-col md:flex-row flex-wrap gap-5 justify-center */}
      {/* Cards Grid */}
      <div className="p-5 flex flex-col gap-5 items-center ">
        <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center lg:grid lg:grid-cols-2 lg:gap-4">
          {posts.map((post, index) => (
            <div
              
              key={post.id}
              className="w-full max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl "
            >
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                {/* Title and status */}
                <div className="flex justify-between items-start gap-4">
                  <a href="#" onClick={() => DisplayDeatils(post.id)} className="mb-2 text-[15px] md:text-[18px] lg:text-xl font-bold tracking-tight text-black hover:text-blue-700">
                    {post.title}
                  </a>

                  {/* Status and dots */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`${getStatusColor(
                        post.status
                      )} rounded flex items-center justify-center w-[70px] h-[18px] text-[10px] sm:w-[80px] sm:h-[19px] sm:text-[11px] md:w-[90px] md:h-[20px] md:text-[13px]`}
                    >
                      <p className="text-white">{post.status}</p>
                    </div>

                    {/* Dropdown Button */}
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === index ? null : index
                          )
                        }
                        className="inline-flex items-center p-2 text-sm font-medium text-center hover:bg-gray-50 rounded"
                        type="button"
                      >
                        <HiOutlineDotsHorizontal className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === index && (
                        <div className="absolute z-10 mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                          <ul className="py-2 text-sm text-gray-700">
                            <li>
                              <Link
                                to={"/update"}
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                Update
                              </Link>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                Archive
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-3 font-normal text-gray-400 text-[9px] md:text-[10px] lg:text-xs flex items-center gap-5">
                  <p>By {post.author}</p>
                  <p>Created: {post.created}</p>
                  <p>Updated: {post.updated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
