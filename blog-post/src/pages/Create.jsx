import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      status,
    };

    try {
      const response = await fetch("https://twincles.mavenerp.in/api/public/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Post created successfully!" });
        setTitle("");
        setContent("");
        setStatus("draft");
      } else {
        setMessage({ type: "error", text: data?.message || "Failed to create post." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default Create;
