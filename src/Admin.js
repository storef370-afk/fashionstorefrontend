import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://fashionstorebackend-1-sa6g.onrender.com"; // your live backend

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file inputs
  const handleImageChange = (e) => setImageFile(e.target.files[0]);
  const handleVideoChange = (e) => setVideoFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);

      if (imageFile) data.append("image", imageFile);
      if (videoFile) data.append("video", videoFile);

      const res = await axios.post(`${API_URL}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Product uploaded successfully!");
      setFormData({ name: "", price: "", category: "", description: "" });
      setImageFile(null);
      setVideoFile(null);
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
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label className="block">
          Image Upload:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <label className="block">
          Video Upload (optional):
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>

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
