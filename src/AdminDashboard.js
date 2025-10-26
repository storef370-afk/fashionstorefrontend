import React, { useState } from "react";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const CLOUD_NAME = "dyetyv1px"; // ✅ Your Cloudinary cloud name
  const UPLOAD_PRESET = "pedahel"; // Make sure this is an unsigned preset

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("⏳ Uploading...");

    if (!file) {
      setMessage("⚠️ Please select an image or video file");
      return;
    }

    try {
      // ✅ Step 1: Upload file to Cloudinary
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
      if (!uploadData.secure_url) {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed");
      }

      const imageUrl = uploadData.secure_url;

      // ✅ Step 2: Save product info to backend
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

      const productData = await productRes.json();

      if (productRes.ok) {
        setMessage("✅ Product uploaded successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setFile(null);
      } else {
        setMessage(`❌ Failed: ${productData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Upload failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🛍️ Admin Dashboard
        </h2>

        <form
          onSubmit={handleUpload}
          className="flex flex-col gap-4 text-gray-700"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="number"
            placeholder="Price (₦)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            rows="4"
          ></textarea>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-lg p-3 cursor-pointer"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Upload Product
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

