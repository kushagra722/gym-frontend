import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUserPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetail from "./pages/UserDetail";
import Footer from "./components/Footer";

// Protect routes based on authentication
const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-list"
          element={<ProtectedRoute element={UserList} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/add-user"
          element={<ProtectedRoute element={AddUser} />}
        />
        <Route
          path="/user-detail"
          element={<ProtectedRoute element={UserDetail} />}
        />
      </Routes>
        <Footer /> 
    </>
  );
};

export default App;
