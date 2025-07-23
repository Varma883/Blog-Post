import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import Create from './pages/Create';
import ViewBlog from './pages/ViewBlog'; 
import Update from './pages/Update';
import Dashboard from './layout/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn>
              <SignUp />
            </RedirectIfLoggedIn>
          }
        />

        {/* Protected layout for authenticated routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/post" element={<Posts />} />
          <Route path="/create" element={<Create />} />
          <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        </Route>

        

        
        
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
