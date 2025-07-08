import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Posts = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAutherOpen, setIsAutherOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mt-3 p-4">
        <h1 className="text-2xl  font-sans font-medium ">Blog Post</h1>

        <button
          type="button"
          class="text-white flex items-center text-center  gap-3 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
        >
          <FaPlus className="items-center" />
          Create New Post
        </button>
      </div>

      <div className="  p-3">
        <div className="border border-gray-300 w-full p-4 rounded-2xl flex justify-between items-center bg-gray-100  ">
          <form className=" w-[500px] h-[] ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
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

          <div className="flex justify-between gap-4">
            {/* staus  */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsStatusOpen(true)}
              onMouseLeave={() => setIsStatusOpen(false)}
            >
              <button
                type="button"
                className=" text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm  px-3 py-2 inline-flex items-center"
              >
                All Statuses
                <svg
                  className="w-2.5 h-2.5 ms-3"
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
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* authers */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsAutherOpen(true)}
              onMouseLeave={() => setIsAutherOpen(false)}
            >
              <button
                type="button"
                className=" text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-3 py-2 inline-flex items-center"
              >
                All Authers
                <svg
                  className="w-2.5 h-2.5 ms-3"
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

              {isAutherOpen && (
                <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                className=" text-gray-400 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-3 py-2 inline-flex items-center"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

   
   {/* cards start from here */}
      <div className=" p-5 flex flex-col gap-5 items-center">
        <div className="flex gap-5">
          <div>
            <div
              href="#"
              class=" w-full max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                 <div className="flex gap-8">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-black">
                    Noteworthy technology acquisitions 2021
                  </h5>

                  <div className="flex gap-3 ">
                    <div className="w-[90px] h-[20px] bg-green-500 border-white rounded p-3 text-center flex items-center">
                    <p className="text-[13px] text-white">PUBLISHED</p>

                    
                  </div>

                  <span><HiOutlineDotsHorizontal /></span>
                </div>
                </div> 
                
                

                <div className="mb-3 font-normal text-gray-400 text-xs flex items-center gap-5">
                    <p>By Jhon doe</p>
                    <p>Created:2024-10-26</p>
                    <p>Updated:2025-4-20</p>
                    
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              href="#"
              class="  w-full max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                 <div className="flex gap-8">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-black">
                    Noteworthy technology acquisitions 2021
                  </h5>
                <div className="flex gap-3 ">
                    <div className="w-[90px] h-[20px] bg-gray-400 border-white rounded p-3 text-center flex items-center">
                    <p className="text-[13px] text-white  ms-3">DRAFT</p>

                    
                  </div>

                  <span><HiOutlineDotsHorizontal /></span>
                </div>
                  

                </div> 
                
                

                
                <div className="mb-3 font-normal text-gray-400 text-xs flex items-center gap-5">
                    <p>By Jhon doe</p>
                    <p>Created:2024-10-26</p>
                    <p>Updated:2025-4-20</p>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <div
              href="#"
              class=" w-full max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                 <div className="flex gap-8">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-black">
                    Noteworthy technology acquisitions 2021
                  </h5>

                  <div className="flex gap-3 ">
                    <div className="w-fit h-[20px] bg-green-500 border-white rounded p-3 text-center flex items-center">
                    <p className="text-[13px] text-white">PUBLISHED</p>

                    
                  </div>

                  <span><HiOutlineDotsHorizontal /></span>
                </div>
                </div> 
                
                

                <div className="mb-3 font-normal text-gray-400 text-xs flex items-center gap-5">
                    <p>By Jhon doe</p>
                    <p>Created:2024-10-26</p>
                    <p>Updated:2025-4-20</p>
                    
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              href="#"
              class=" w-full max-w-sm flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                 <div className="flex gap-8">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-black">
                    Noteworthy technology acquisitions 2021
                  </h5>
                <div className="flex gap-3 ">
                    <div className="w-fit h-[20px] bg-gray-400 border-white rounded p-3 text-center flex items-center">
                    <p className="text-[13px] text-white">ARCHIVED</p>

                    
                  </div>

                  <span><HiOutlineDotsHorizontal /></span>
                </div>
                  

                </div> 
                
                

                
                <div className="mb-3 font-normal text-gray-400 text-xs flex items-center gap-5">
                    <p>By Jhon doe</p>
                    <p>Created:2024-10-26</p>
                    <p>Updated:2025-4-20</p>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
