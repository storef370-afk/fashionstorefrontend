import React, { useState } from "react";

const API_URL = "https://fashionstorebackend-91gq.onrender.com";

function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) setIsLoggedIn(true);
    else setMessage("❌ Wrong password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, password }),
    });
    if (res.ok) {
      setMessage("✅ Product uploaded successfully!");
      setForm({ name: "", price: "", image: "", category: "", description: "" });
    } else {
      setMessage("❌ Failed to upload product");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p>{message}</p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category (Men, Women, Kids, Unisex)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">Add Product</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Admin;
