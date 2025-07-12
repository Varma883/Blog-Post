import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";

const Create = () => {
  const [content, setContent] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="w-full h-full  ">
      {/* header section  */}
      <div className="flex justify-between  p-4">
        <Link
          to={"/post"}
          href="#"
          class="font-medium text-xs lg:text-sm  text-gray-400  flex items-center gap-2"
        >
          <FaArrowLeft />
          <p className="hover:text-black ">Back to Blog Post</p>
        </Link>

        <h1 className=" text-xs lg:text-2xl  font-sans font-medium">
          Create New Blog Post
        </h1>
      </div>

      {/* form starte hear */}
      {/* <div className="flex items-center justify-center mt-3">
        <div className="w-full max-w-2xl h-[650px] border rounded-xl bg-gray-100  p-4   ">
          <div className="flex flex-col gap-3 px-4 py-3 ">
            <form className="max-w-sm">
              <label
                htmlFor="Title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="Title"
                aria-describedby="helper-text-explanation"
                placeholder="Enter Post Title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-gray-500 focus:border-gray-500 block w-[600px]  p-2.5"
              />
            </form>

            <form className="max-w-sm ">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="4"
                placeholder="Start Writing your blog post here..."
                className="block p-2.5 w-[600px] h-[250px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                   focus:ring-gray-500 focus:border-gray-500"
              ></textarea>
            </form>

            <form className="max-w-sm">
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Author
              </label>
              <select
                id="author"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-gray-500 focus:border-gray-500 block w-[600px] p-2.5"
              >
                <option value="jane">Jane Doe</option>
                <option value="john">John Smith</option>
                <option value="emily">Emily Johnson</option>
                <option value="michael">Michael Brown</option>
              </select>
            </form>

            <form className="max-w-sm">
              <label
                htmlFor="satus"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-gray-500 focus:border-gray-500 block w-[600px] p-2.5"
              >
                <option>Publish</option>
                <option>Draft</option>
                <option>Archive</option>
              </select>
            </form>
          </div>

          
          <div className="flex justify-end mt-3 ">
            <button
              type="button"
              class="text-blue-700 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
            >
              Cancel
            </button>

            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
            >
             <span className="flex items-center gap-2"><FiSave /><p>Save Draft</p></span> 
            </button>

            <button
              type="button"
              class="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
            >
             <span className="flex items-center gap-2"><FaRegPaperPlane /><p>Green</p></span> 
            </button>
          </div>
        </div>
      </div> */}
      <div className="flex items-center justify-center mt-3 px-4">
        <div className="w-full max-w-2xl border rounded-xl bg-gray-100 p-4 ">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-full max-w-[600px]">
              {/* Title */}
              <form className="w-full">
                <label
                  htmlFor="Title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="Title"
                  placeholder="Enter Post Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                />
              </form>

              {/* Content */}
              {/* <form className="w-full mt-3">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Content
                </label>
                 <textarea
            id="content"
            rows="6"
            placeholder="Start Writing your blog post here..."
            className="block w-full h-55  p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
              focus:ring-gray-500 focus:border-gray-500"
          ></textarea>  
           
               
              </form> */}
              <div className="w-full mt-3">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Content
                </label>
                <RichTextEditor
                  onChange={(value) => {
                    if (isMounted) setContent(value);
                  }}
                />
              </div>

              {/* Author */}
              <form className="w-full mt-3">
                <label
                  htmlFor="author"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Author
                </label>
                <select
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                >
                  <option value="jane">Jane Doe</option>
                  <option value="john">John Smith</option>
                  <option value="emily">Emily Johnson</option>
                  <option value="michael">Michael Brown</option>
                </select>
              </form>

              {/* Status */}
              <form className="w-full mt-3">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                >
                  <option>Publish</option>
                  <option>Draft</option>
                  <option>Archive</option>
                </select>
              </form>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <button
              type="button"
              className="text-blue-700 bg-blue-200 hover:bg-blue-300  font-medium rounded-lg text-sm px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2"
            >
              <span className="flex items-center gap-2">
                <FiSave />
                <p>Save Draft</p>
              </span>
            </button>

            <button
              type="button"
              className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2"
            >
              <span className="flex items-center gap-2">
                <FaRegPaperPlane />
                <p>Submit</p>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
