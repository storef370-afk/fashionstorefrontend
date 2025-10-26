import React, { useState } from "react";

const API_URL = "https://fashionstorebackend-91gq.onrender.com"; // your backend
const CLOUD_NAME = "dyetyv1px"; // from Cloudinary
const UPLOAD_PRESET = "ml_default"; // your preset (create if missing)

function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Pedahelmylove247") {
      setAuthenticated(true);
    } else {
      alert("Wrong admin password");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    setMessage("Uploading...");

    try {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData }
      );
      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        setMessage("❌ Upload failed");
        return;
      }

      // Send data to backend
      const res = await fetch(`${API_URL}/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: "Pedahelmylove247",
          name,
          price,
          category,
          description,
          image: cloudData.secure_url,
        }),
      });

      if (res.ok) {
        setMessage("✅ Product uploaded successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setFile(null);
      } else {
        setMessage("❌ Failed to save product to backend");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Upload error");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "black",
              color: "white",
              border: "none",
              width: "100%",
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2>🛍️ Admin Dashboard</h2>
      <p>Upload new products to your store</p>

      <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (₦)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (Men/Women/Kids)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          style={{ padding: "10px", background: "black", color: "white", border: "none" }}
        >
          Upload Product
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default Admin;
