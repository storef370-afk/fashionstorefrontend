import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://fashionstorebackend-1-sa6g.onrender.com"; // live backend
const ADMIN_PASSWORD = "Pedahelmylove247"; // replace with secure method if needed

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
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle file inputs
  const handleImageChange = (e) => setImageFile(e.target.files[0]);
  const handleVideoChange = (e) => setVideoFile(e.target.files[0]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple submits
    setLoading(true);
    setMessage("Uploading...");

    try {
      let imageUrl = "";
      let videoUrl = "";

      // 1️⃣ Upload image
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("file", imageFile);
        const imgRes = await axios.post(`${API_URL}/api/upload`, imgData);
        imageUrl = imgRes.data.url;
      } else {
        throw new Error("Image file is required");
      }

      // 2️⃣ Upload video (optional)
      if (videoFile) {
        const vidData = new FormData();
        vidData.append("file", videoFile);
        const vidRes = await axios.post(`${API_URL}/api/upload`, vidData);
        videoUrl = vidRes.data.url;
      }

      // 3️⃣ Send product data as JSON to /api/admin/products
      await axios.post(`${API_URL}/api/admin/products`, {
        password: ADMIN_PASSWORD,
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        image: imageUrl,
        video: videoUrl, // optional
      });

      setMessage("✅ Product added successfully!");
      setFormData({ name: "", price: "", category: "", description: "" });
      setImageFile(null);
      setVideoFile(null);
    } catch (err) {
      console.error("Error uploading product:", err);
      if (err.response?.status === 401) setMessage("❌ Unauthorized: wrong password");
      else if (err.response?.status === 400) setMessage("❌ Bad Request: check all fields");
      else setMessage("❌ Failed to upload product.");
    } finally {
      setLoading(false);
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
          placeholder="Category"
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
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </label>

        <label className="block">
          Video Upload (optional):
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>

        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default Admin;
