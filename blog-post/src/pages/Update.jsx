import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegPaperPlane } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";

const Update = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, authToken } = useAuth(); // authToken and user is required

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "published",
    author_id: user?.id || "",
  });

   const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  
 // Funtion for geetin the post deatails
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
      console.log("API response:", response.data); // consoule log the resposse
      setPost(response.data.data ?? response.data); //set the data into post
      setFormData({
      title: response.data.title,
      content: response.data.content,
      status: response.data.status,
      author_id: response.data.author_id,
    });
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // This is to the call the fetch post to get post deatial from API by calling fethcPost() funtion
  useEffect(() => {
    if (postId && authToken) fetchPost();
  }, [postId, authToken]);


 

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/public/api/posts/${postId}}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    toast.success("Post updated successfully!");
    navigate("/post");
  } catch (error) {
    console.error("Error updating post:", error);
    toast.error("Failed to update post");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
        <Link
          to="/post"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium"
        >
          <FaArrowLeft />
          <span>Back to Blog Post</span>
        </Link>
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
          Create New Blog Post
        </h1>
      </div>

      {/* Form Container */}
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

          {/* Author and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={user?.name || "Unknown"}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-gray-100"
              />
            </div>

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
