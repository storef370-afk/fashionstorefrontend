import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Admin from "./Admin";

const API_URL = "https://fashionstorebackend-91gq.onrender.com";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">🛍️ Fashion Store</h1>
        <p className="text-sm text-gray-300 mt-1">
          Trendy wears for Men, Women & Kids
        </p>
        <Link
          to="/admin"
          className="inline-block mt-3 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Admin Dashboard
        </Link>
      </header>

      {/* Products Section */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              )}
              {product.video && (
                <video
                  src={product.video}
                  controls
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700 font-bold mt-2">₦{product.price}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {product.category || "Uncategorized"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products yet — check back soon!
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-4 mt-6">
        © {new Date().getFullYear()} Fashion Store. All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
