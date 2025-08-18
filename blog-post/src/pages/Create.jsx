import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegPaperPlane } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";

const Create = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { id } = useParams(); // for edit mode

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "published",
    image_url: null, // For the new file
    existingImageUrl: null, // existing image path from API
  });

  // Fetch post if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE_URL}/api/public/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          const post = res.data;
          setFormData({
            title: post.title || "",
            content: post.content || "",
            status: post.status || "published",
            image_url: null,
            existingImageUrl: post.image_url
              ? `${API_BASE_URL}/storage/${post.image_url}`
              : null,
          });
          setImagePreview(
            post.image_url ? `${API_BASE_URL}/storage/${post.image_url}` : null
          );
        })
        .catch((err) => {
          toast.error("Failed to load post details.");
        });
    }
  }, [id, authToken]);

  // Handle text & select changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle editor content
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image_url: file,
        existingImageUrl: null, // remove old one if uploading new
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected/existing image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      existingImageUrl: null,
    }));
    setImagePreview(null);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("status", formData.status);

      if (formData.image_url) {
        data.append("image_url", formData.image_url);
      }

      let response;
      if (id) {
        // Update
        response = await axios.post(
          `${API_BASE_URL}/api/public/api/posts/${id}?_method=PUT`,
          data,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      } else {
        // Create
        response = await axios.post(
          `${API_BASE_URL}/api/public/api/posts`,
          data,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }

      if ([200, 201].includes(response.status)) {
        toast.success(
          id ? "Post updated successfully!" : "Post created successfully!"
        );
        navigate("/post");
      } else {
        toast.error("Failed to save post.");
      }
    } catch (error) {
      console.error("Post Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {id ? "Edit Blog Post" : "Create New Blog Post"}
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
              placeholder="Enter Post Title"
              value={formData.title}
              onChange={handleChange}
              required
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
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white outline-none"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
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
              {isSubmitting ? "Saving..." : id ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
