import React, { useState } from "react";

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://fashionstorebackend-1-sa6g.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("admin", "true");
      onLogin();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Logo / Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-black tracking-wide mb-2">
          🛍️ FABRI-DECO
        </h1>
        <p className="text-gray-600 text-lg">
          Admin Access — Fashion Store Management
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-80 md:w-96 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm text-center mt-4">{error}</p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} FABRI-DECO Admin Panel
      </footer>
    </div>
  );
}

export default AdminLogin;
