import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegPaperPlane } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";

const Update = () => {
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "published",
    image_url: null, // file to upload
    imagePreviewUrl: "", // preview URL
    removeImage: false, // flag for removing
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const fetchPost = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/public/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = response.data.data ?? response.data;

    setFormData({
      title: data.title,
      content: data.content,
      status: data.status,
      image_url: null,
      imagePreviewUrl: data.image_url
  ? data.image_url.startsWith("http")
    ? data.image_url
    : `${API_BASE_URL}/api/storage/app/public/${data.image_url}`
  : "",

      removeImage: false,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (postId && authToken) fetchPost();
  }, [postId, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("status", formData.status);

      if (formData.image_url instanceof File) {
        data.append("image_url", formData.image_url);
      }

      if (formData.removeImage) {
        data.append("image_url", ""); // forces backend to overwrite with empty value
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/public/api/posts/${postId}?_method=PUT`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Post updated successfully!");
        navigate("/post");
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading post...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#0072CE] shadow-sm rounded-2xl">
        <Link
          to="/post"
          className="flex items-center gap-2 text-white hover:text-gray-300 text-sm font-medium"
        >
          <FaArrowLeft />
          <span>Back to Blog Post</span>
        </Link>
        <h1 className="text-xl lg:text-2xl font-semibold text-white">
          Edit Blog Post
        </h1>
      </div>

      {/* Form */}
      <div className="flex justify-center p-6">
        <form
          className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Post Title"
              className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white focus:ring outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={handleEditorChange}
            />
          </div>

          {/* Status & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>

              {/* Existing image preview */}
              {formData.imagePreviewUrl && !formData.removeImage && (
                <div className="mb-3">
                  <img
                    src={formData.imagePreviewUrl}
                    alt="Current"
                    className="w-48 h-auto rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        image_url: null,
                        imagePreviewUrl: "",
                        removeImage: true,
                      })
                    }
                    className="text-xs mt-1 text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              )}

              {/* File input */}
              <input
                type="file"
                id="image_url"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image_url: e.target.files[0],
                    imagePreviewUrl: URL.createObjectURL(e.target.files[0]),
                    removeImage: false, // new image overrides remove flag
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/post")}
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <FaRegPaperPlane />
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
