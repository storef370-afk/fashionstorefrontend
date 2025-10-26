import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import "./index.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin") === "true");

  const handleLogin = () => {
    setIsAdmin(true);
    window.location.href = "/dashboard"; // redirect after login
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    window.location.href = "/admin";
  };

  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={<AdminLogin onLogin={handleLogin} />}
          />

          <Route
            path="/dashboard"
            element={
              isAdmin ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
