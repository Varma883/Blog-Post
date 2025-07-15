import React, { useState } from "react";
import { FaArrowLeft, FaRegPaperPlane } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";


const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_id: "",
    status: "Publish",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
        <div className="flex flex-wrap justify-end gap-3  border-gray-200">
          <button
            type="button"
            className="text-blue-600 bg-blue-200 hover:bg-blue-300 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
           <MdOutlineArchive  />Archive
          </button>
           <button
            type="button"
            className="text-blue-600 bg-blue-200 hover:bg-blue-300 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <FaEyeSlash />Unpublish
          </button>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <RiDeleteBin6Line />
            Delete
          </button>
          <Link
            to={'/update'}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <TbEdit />
            Edit Post
          </Link>
        </div>
      </div>

      <div className="p-3 mt-3 ">
        <div className="border border-gray-300 w-full h-[500px] p-4 rounded-2xl bg-gray-100">
            
        </div>
      </div>
    </div>
  );
};

export default Create;
