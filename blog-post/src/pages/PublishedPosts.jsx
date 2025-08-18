import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";

const DraftPost = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const optionRefs = useRef([]); // edit and archive reff
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null); // use ref for status
  const [isOpen, setIsOpen] = useState(false); // for account dropdown
  const dropdownRef = useRef(null); // usinf useRef for account drop down
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // track current page
  const [lastPage, setLastPage] = useState(1); // get total number of pages
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, authToken, logout } = useAuth();

  const toogleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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

  useEffect(() => {
    const fetchPosts = async (page) => {
      setLoading(true); //Starts loading here
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/public/api/posts?page=${page}`
        );
        setPosts(response.data.data);
        console.log(response.data.data, "1234567890-");
        setPage(response.data.current_page);
        setLastPage(response.data.last_page);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // stops loading aftet gtting the post
      }
    };

    fetchPosts(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "text-green-500";
      case "draft":
        return "text-gray-400";
      case "archived":
        return "text-red-400";

      default:
        return "text-gray-300";
    }
  };

  const DisplayDeatils = (id) => {
    navigate(`/view/${id}`);
  };

  const updatePost = (id) => {
    navigate(`/update/${id}`);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/public/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const archivePost = async (id) => {
    if (!window.confirm("Are you sure you want to archive this post?")) return;

    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${id}/archive`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post.id !== id);
        optionRefs.current = [];
        return updatedPosts;
      });
      setActiveDropdown(null);
      toast.success("Post archived successfully.");
    } catch (error) {
      console.error("Failed to archive post:", error);
      toast.error("Failed to archive post. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3  bg-[#0072CE] shadow-sm rounded-2xl">
          <h1 className="text-white text-sm md:text-xl lg:text-2xl font-sans font-medium">
            Blog Post
          </h1>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-1 bg-amber-500 rounded-full  hover:bg-blue-500  active:bg-sky-600 active:text-white transition"
              onClick={toogleDropdown}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <VscAccount className="text-2xl text-white" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-sky-700  shadow-2xl rounded-xl z-50 overflow-hidden">
                {/* User Info */}
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-100">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || "User"}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-300 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                >
                  <IoLogOutOutline className="text-xl" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-3 mt-2">
          <div className="border border-gray-300 bg-amber-400 w-full p-4 rounded-2xl ">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <form className="w-full lg:w-[500px] ">
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
                    className="block w-full p-2 ps-10 text-sm text-gray-900  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search posts..."
                    required
                  />
                </div>
              </form>

              {/* Filters Section */}
              <div className="flex gap-3 justify-between">
                {/* Status Filter */}
                <div className="relative" ref={statusRef}>
                  <button
                    type="button"
                    onClick={() => setIsStatusOpen((prev) => !prev)}
                    className="text-white  border-red-800  bg-red-600 focus:ring-gray-400 focus:border-gray-400 font-medium rounded-lg text-[10px] lg:text-sm px-3 py-2 inline-flex items-center"
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
                          <Link
                            to={"/published"}
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Published
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/draft"}
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Draft
                          </Link>
                        </li>
                        {/* <li>
                                                  <Link
                                                    to={"/archive"}
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                  >
                                                    Archived
                                                  </Link>
                                                </li> */}
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  to={"/userdata"}
                  type="button"
                  className="text-white flex items-center text-center gap-2 lg:gap-3 font-medium rounded-lg text-xs px-2 py-1.5 lg:text-sm lg:px-4 lg:py-2.5 bg-sky-800 hover:bg-sky-700 focus:outline-none focus:ring-1 focus:ring-blue-800"
                >
                  User Data
                </Link>

                <div className="relative">
                  <Link
                    to="/create"
                    className="text-white flex items-center text-center gap-2 lg:gap-3 font-medium rounded-lg text-xs px-2 py-1.5 lg:text-sm lg:px-4 lg:py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  >
                    <FaPlus />
                    Create New Post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-5 flex flex-col gap-5 items-center mb-2">
          {loading ? (
            <p className="text-gray-400 text-center">Loading posts...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(posts) && posts.length > 0 ? (
                posts

                  .filter((post) => post.status?.toLowerCase() === "published")
                  .map((post, index) => (
                    <div
                      key={post.id}
                      onClick={() => DisplayDeatils(post.id)}
                      className="relative bg-white shadow rounded-lg p-4"
                    >
                      <RiDeleteBin6Line
                        onClick={async () => {
                          e.stopPropagation();
                          await deletePost(post.id);
                        }}
                        className=" absolute top-2 right-2 text-red-600 cursor-pointer hover:text-red-700"
                      />
                      <h2 className="text-lg font-semibold text-blue-800 mb-2 line-clamp-2">
                        {post.title.length > 60
                          ? `${post.title.slice(0, 60)}...`
                          : post.title}
                      </h2>
                      <p className="text-gray-600 mb-1">
                        Created:{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex justify-between gap-3 items-center">
                        <div className="flex items-center gap-1 ">
                          <p className="text-sm">Status:</p>
                          <p
                            className={`${getStatusColor(
                              post.status
                            )} text-gray-600 text-sm font-bold `}
                          >
                            {" "}
                            {post.status.toUpperCase()}
                          </p>
                        </div>

                        <div className="flex justify-between gap-2 items-center mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updatePost(post.id);
                            }}
                            className="text-sm px-3 py-1 bg-sky-700 text-white rounded hover:bg-blue-700"
                          >
                            Update
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              archivePost(post.id);
                            }}
                            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="w-full col-span-full flex justify-center items-center py-10">
                  <p className="text-gray-400 text-center text-lg">
                    No posts found.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PageNation buttons */}
        <div className="flex justify-center gap-3 items-center mt-3 mb-1">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {lastPage}
          </span>
          <button
            onClick={handleNext}
            disabled={page === lastPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DraftPost;
