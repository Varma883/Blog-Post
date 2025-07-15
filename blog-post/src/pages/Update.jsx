import React from 'react'

const Update = () => {
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
  const handleSubmit= async(e) =>{
    e.preventDefault();
    setError("");

  }

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
        <form className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6" onSubmit={handleSubmit}>
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
              className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white focus:ring outline-none transition"
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
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author
              </label>
              <select
                id="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select Author</option>
                <option value="1">Jane Doe</option>
                <option value="2">John Smith</option>
                <option value="3">Emily Johnson</option>
                <option value="4">Michael Brown</option>
              </select>
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
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
                <option value="Archive">Archive</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            >
              <FiSave />
              Save Draft
            </button>
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            >
              <FaRegPaperPlane />
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update
