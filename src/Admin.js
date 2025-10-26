import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://fashionstorebackend-91gq.onrender.com";

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    video: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/products`, formData);
      setMessage("✅ Product uploaded successfully!");
      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        video: "",
      });
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Failed to upload product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₦)"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Men, Women, Kids...)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (from Cloudinary)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="video"
          placeholder="Video URL (optional)"
          value={formData.video}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Upload Product
        </button>

        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default Admin;
