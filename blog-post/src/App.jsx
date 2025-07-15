import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Create from './pages/Create';
import Dashboard from './layout/Dashboard'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/SignUp';
import ViewBlog from './pages/ViewBlog';

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with Dashboard layout */}
        <Route path="/" element={<Dashboard />}>
          <Route path="post" element={<Posts />} />
          <Route path="post/view/:postid" element={<ViewBlog />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
