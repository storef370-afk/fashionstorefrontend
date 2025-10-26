import React, { useState } from "react";

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://fashionstorebackend-1-sa6g.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("admin", "true");
      onLogin();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Login</h2>
        <p className="text-gray-500 mb-6">Enter the admin password to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
