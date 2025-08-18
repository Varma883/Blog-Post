import axios from "axios";
import Sidebar from "../components/Sidebar";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

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
  const [activeStatus, setActiveStatus] = useState(null); // for filter API
  const navigate = useNavigate();
  const { user, authToken, logout } = useAuth();
  const location = useLocation();

  // search Bar

  const [query, setQuery] = useState(""); // State for input
  const [results, setResults] = useState([]); // State for API response

  const queryParams = new URLSearchParams(location.search);

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

  const fetchPosts = async (page = 1, status = null) => {
    setLoading(true);
    try {
      const endpoint = status
        ? `${API_BASE_URL}/api/public/api/filter-by-status?status=${status}&page=${page}`
        : `${API_BASE_URL}/api/public/api/posts?page=${page}`;

      const headers = status ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.get(endpoint, { headers });

      setPosts(response.data.data || []);

      setPage(response.data.current_page);

      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentStatus = new URLSearchParams(location.search).get("status");
    setActiveStatus(currentStatus);
    fetchPosts(page, currentStatus);
  }, [location.search, page]);

  const fetchPostsByStatus = (status) => {
    setIsStatusOpen(false);
    setPage(1);
    navigate(`?status=${status}`); // update the URL
  };

  //Pagination Handlers
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1); // This will trigger useEffect
    }
  };

  const handleNext = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1); // This will trigger useEffect
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
      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post.");
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

  const restorePost = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${id}/restore`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, status: "draft" } : post
        )
      );
      toast.success("Post restored successfully.");
    } catch (error) {
      console.error("Restore failed:", error);
      toast.error("Failed to restore post.");
    }
  };

  const unpublishPost = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${id}/unpublish`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      toast.success("Post unpublished successfully.");
    } catch (error) {
      console.error("Unpublish failed:", error);
      toast.error("Failed to unpublish post.");
    }
  };

  const publishPost = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${id}/publish`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      toast.success("Post published successfully.");
    } catch (error) {
      console.error("Publish failed:", error);
      toast.error("Failed to publish post.");
    }
  };

  // search post
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://twincles.mavenerp.in/api/public/api/posts/search?query=${query}`
      );
      setPosts(res.data.data);
      setPage(1);
      setLastPage(1);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      fetchPosts(); // Load default posts again
    }
  }, [query]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
              <form onSubmit={handleSearch} className="w-full lg:w-[500px] ">
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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
                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="text-white border-red-800 bg-red-600 focus:ring-gray-400 focus:border-gray-400 font-medium rounded-lg text-[10px] lg:text-sm px-3 py-2 inline-flex items-center"
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

                  {/* Dropdown Menu */}
                  {isStatusOpen && (
                    <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
                      <ul className="py-2 text-sm text-gray-700">
                        {/* All */}
                        <li>
                          <button
                            onClick={() => {
                              setPage(1);
                              setIsStatusOpen(false);
                              navigate({ pathname: location.pathname }); // Removes ?status param
                            }}
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                          >
                            All
                          </button>
                        </li>

                        {/* Published */}
                        <li>
                          <button
                            onClick={() => {
                              fetchPostsByStatus("published");
                              setIsStatusOpen(false);
                              navigate(`?status=published`);
                            }}
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                          >
                            Published
                          </button>
                        </li>

                        {/* Draft */}
                        <li>
                          <button
                            onClick={() => {
                              fetchPostsByStatus("draft");
                              setIsStatusOpen(false);
                              navigate(`?status=draft`);
                            }}
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                          >
                            Draft
                          </button>
                        </li>

                        {/* Archived */}
                        <li>
                          <button
                            onClick={() => {
                              fetchPostsByStatus("archived");
                              setIsStatusOpen(false);
                              navigate(`?status=archived`);
                            }}
                            className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                          >
                            Archived
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  type="button"
                  to={"/userdata"}
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
        <div className="p-5 flex flex-col gap-5 items-stretch mb-2">
          {loading ? (
            <p className="text-gray-400 text-center">Loading posts...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    key={post.id}
                    onClick={() => DisplayDeatils(post.id)}
                    className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
                  >
                    {/* Delete Icon */}
                    <RiDeleteBin6Line
                      onClick={async (e) => {
                        e.stopPropagation();
                        await deletePost(post.id);
                      }}
                      className=" absolute top-3 right-3 bg-white p-1 rounded-full shadow-md text-red-600 hover:text-red-700 hover:bg-gray-100 text-2xl transition-colors duration-200"
                    />

                    {/* Image */}
                    {post.image_url && (
                      <img
                        src={`https://twincles.mavenerp.in/api/storage/app/public/${post.image_url}`}
                        alt="Blog Post"
                        className="w-full h-48 object-cover"
                      />
                    )}

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title */}
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title.length > 60
                          ? `${post.title.slice(0, 60)}...`
                          : post.title}
                      </h2>

                      {/* Created Date */}
                      <p className="text-sm text-gray-500 mb-3">
                        Created:{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            post.status
                          )}`}
                        >
                          {post.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto flex flex-wrap gap-2">
                        {(post.status === "published" ||
                          post.status === "draft") && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updatePost(post.id);
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            Update
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            post.status === "archived"
                              ? restorePost(post.id)
                              : archivePost(post.id);
                          }}
                          className={`px-4 py-2 text-white text-sm rounded-lg transition-colors duration-200 ${
                            post.status === "archived"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-yellow-500 hover:bg-yellow-600"
                          }`}
                        >
                          {post.status === "archived" ? "Restore" : "Archive"}
                        </button>

                        {post.status === "published" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              unpublishPost(post.id);
                            }}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            Unpublish
                          </button>
                        )}

                        {post.status === "draft" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              publishPost(post.id);
                            }}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            Publish
                          </button>
                        )}
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
        <div className="flex justify-center items-center gap-3 mt-3 mb-1">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          Page {page} of {lastPage}
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
