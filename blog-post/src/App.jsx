import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import Create from './pages/Create';
import ViewBlog from './pages/ViewBlog';
import Dashboard from './layout/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* Entry point: Decide where to go */}
        <Route path="/" element={
          user ? <Navigate to="/post" /> : <Navigate to="/login" />
        } />

        {/* Public routes */}
        <Route path="/login" element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        } />

        <Route path="/signup" element={
          <RedirectIfLoggedIn>
            <SignUp />
          </RedirectIfLoggedIn>
        } />

        {/* Protected dashboard layout and nested routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path="post" element={<Posts />} />
          <Route path="create" element={<Create />} />
          <Route path="post/view/:postid" element={<ViewBlog />} />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
