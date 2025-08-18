import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import { FaArrowLeft, FaRegPaperPlane } from "react-icons/fa";
import { MdOutlineArchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ViewBlog = () => {
  const { authToken } = useAuth();
  const { id } = useParams();
  useParams;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isArchiving, setIsArchiving] = useState(false); // for setting uf the spinner for archiving

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id);
        const response = await axios.get(
          `${API_BASE_URL}/api/public/api/posts/${id}`
        );
        console.log("API response:", response.data);
        setPost(response.data.data ?? response.data); // fallback
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

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

  const updatePost = (id) => {
    navigate(`/update/${id}`);
  };

  // archive post

  const archivePost = async (id) => {
    if (!window.confirm("Are you sure you want to archive this post?")) return;
    setIsArchiving(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${id}/archive`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      navigate(`/post`);
    } catch (error) {
      console.error("Failed to archive post:", error);
      toast.error("Failed to archive post. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  };

  // Delete post

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to DELETE this post?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/public/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      navigate(`/post`);
    } catch (error) {
      console.error("Failed to Delete post:", error);
      toast.error("Failed to Delete post. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#0072CE] shadow-sm rounded-2xl">
        <Link
          to="/post"
          className="flex items-center gap-2 text-white hover:text-gray-300 text-xs md:text-sm font-medium"
        >
          <FaArrowLeft />
          <span>Back to Blog Post</span>
        </Link>
        <div className="flex  justify-end gap-3  border-gray-200">
          <button
            onClick={async () => {
              await archivePost(post.id);
            }}
            type="button"
            disabled={isArchiving}
            className={`flex items-center gap-2 p-1 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition ${
              isArchiving
                ? "bg-blue-300 text-blue-100 cursor-not-allowed"
                : "text-white bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {isArchiving ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
            ) : (
              <MdOutlineArchive />
            )}
            {isArchiving ? "Archiving..." : "Archive"}
          </button>

          <button
            onClick={async () => {
              await deletePost(post.id);
            }}
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 border-0 p-1 md:px-5 md:py-2.5 rounded-lg text-sm md:text-sm font-medium flex items-center gap-2 transition"
          >
            <RiDeleteBin6Line />
            Delete
          </button>
          <button
            onClick={() => updatePost(post.id)}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 p-1  md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm font-medium flex items-center md:gap-2 transition"
          >
            <TbEdit />
            Edit Post
          </button>
        </div>
      </div>

      <div className="p-3 mt-3">
        <div className="border border-gray-300 w-full min-h-[500px] p-4 rounded-2xl bg-gray-100">
          {!post ? (
            <div className="text-center text-red-500 text-lg font-medium mt-10">
              Post not found
            </div>
          ) : (
            <div>
              {/* Post Title and Meta Info */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {post.title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-4 mb-4">
                <span
                  className={`${getStatusColor(
                    post.status
                  )} text-white text-xs font-semibold px-3 py-1 rounded`}
                >
                  {post.status.toUpperCase()}
                </span>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated: {new Date(post.updated_at).toLocaleDateString()}
                </p>
              </div>

              {/* Blog Image (if present) */}
              {post.image_url && (
                <img
                  src={`https://twincles.mavenerp.in/api/storage/app/public/${post.image_url}`}
                  alt={post.title}
                  className="w-full max-h-[400px] object-cover rounded-lg mb-6 shadow-md"
                />
              )}

              {/* Blog Content */}
              <div
                className="prose max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
