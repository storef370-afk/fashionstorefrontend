import React, { useState } from "react";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const CLOUD_NAME = "dyetyv1px"; // Your Cloudinary cloud name
  const UPLOAD_PRESET = "ml_default"; // You can set this in your Cloudinary settings

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");

    if (!file) {
      setMessage("Please select an image or video file");
      return;
    }

    try {
      // Step 1: Upload file to Cloudinary
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

      // Step 2: Save product info to your backend
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
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2>🛍️ Admin Dashboard - Upload Product</h2>

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
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
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

        <button type="submit" style={{ padding: "10px", background: "#333", color: "white", border: "none" }}>
          Upload Product
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default AdminDashboard;
