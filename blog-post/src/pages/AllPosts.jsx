import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

const AllPosts = () => {
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
        return "bg-green-500";
      case "draft":
        return "bg-gray-400";
      case "archived":
        return "bg-red-400";

      default:
        return "bg-gray-300";
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
        <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
          <h1 className="text-sm md:text-xl lg:text-2xl font-sans font-medium">
            Blog Post
          </h1>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2"
              onClick={toogleDropdown}
            >
              <VscAccount className="text-xl" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  Signed in as
                  <br />
                  <span className="font-semibold">{user?.name || "User"}</span>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
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
                <div className="relative" ref={statusRef}>
                  <button
                    type="button"
                    onClick={() => setIsStatusOpen((prev) => !prev)}
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
                            href="#"
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

                <div className="relative">
                  <Link
                    to="/create"
                    className="text-white flex items-center text-center gap-2 lg:gap-3 font-medium rounded-lg text-xs px-2 py-1.5 lg:text-sm lg:px-4 lg:py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center w-full px-4">
              {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="w-full max-w-sm  flex  flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl"
                  >
                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                      {/* Title and status */}
                      <div className="flex justify-between items-start gap-4">
                        <a
                          href="#"
                          onClick={() => DisplayDeatils(post.id)}
                          className="mb-2 text-[15px] md:text-[18px] lg:text-xl font-bold tracking-tight text-black hover:text-blue-700"
                        >
                          {post.title}
                        </a>

                        <div className="flex items-center gap-3">
                          <div
                            className={`${getStatusColor(
                              post.status
                            )} rounded flex items-center justify-center w-[70px] h-[18px] text-[10px] sm:w-[80px] sm:h-[19px] sm:text-[11px] md:w-[90px] md:h-[20px] md:text-[13px]`}
                          >
                            <p className="text-white">
                              {post.status.toUpperCase()}
                            </p>
                          </div>

                          {/* Dropdown Menu */}
                          <div
                            className="relative inline-block text-left"
                            ref={(el) => (optionRefs.current[index] = el)}
                          >
                            <button
                              onClick={() =>
                                setActiveDropdown((prev) =>
                                  prev === index ? null : index
                                )
                              }
                              className="inline-flex items-center p-2 text-sm font-medium text-center hover:bg-gray-50 rounded"
                            >
                              <HiOutlineDotsHorizontal className="w-5 h-5" />
                            </button>

                            {activeDropdown === index && (
                              <div className="absolute z-10 mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                                <ul className="py-2 text-sm text-gray-700">
                                  <li>
                                    <a
                                      onClick={() => updatePost(post.id)}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      Update
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={async () => {
                                        await archivePost(post.id);
                                        setActiveDropdown(null);
                                      }}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      Archive
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={async () => {
                                        await deletePost(post.id);
                                        setActiveDropdown(null);
                                      }}
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
                        <p>By {post.author || "Unknown Author"}</p>
                        <p>
                          Created:{" "}
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        <p>
                          Updated:{" "}
                          {new Date(post.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No posts found.</p>
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

export default AllPosts;
