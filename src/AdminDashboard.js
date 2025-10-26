import React, { useState } from "react";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const CLOUD_NAME = "dyetyv1px"; // Your Cloudinary cloud name
  const UPLOAD_PRESET = "ml_default"; // Cloudinary upload preset

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");

    if (!file) {
      setMessage("Please select an image or video file");
      return;
    }

    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.secure_url;

      // Step 2: Save product to backend
      const productRes = await fetch(
        "https://fashionstorebackend-1-sa6g.onrender.com/api/admin/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: "Pedahelmylove247",
            name,
            price,
            category,
            description,
            image: imageUrl,
          }),
        }
      );

      if (productRes.ok) {
        setMessage("✅ Product uploaded successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setFile(null);
      } else {
        setMessage("❌ Failed to save product");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Error uploading file");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          🛍️ FABRI-DECO Admin
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Upload new products for your fashion store
        </p>

        <form onSubmit={handleUpload} className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="number"
            placeholder="Price (₦)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Category (e.g., Shoes, Bags, Clothes)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 cursor-pointer focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
          >
            Upload Product
          </button>
        </form>

        {message && (
          <p className="text-center mt-6 text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
