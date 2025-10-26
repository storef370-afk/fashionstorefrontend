import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://fashionstorebackend-1-sa6g.onrender.com";
const categories = ["Shoes", "Clothes", "Earrings", "Hats", "Bags", "Accessories"];

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
  };

  // Filter by category if selected
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  // Distribute products across 4 sections using round-robin
  const sections = [[], [], [], []];
  filteredProducts.forEach((product, idx) => {
    sections[idx % 4].push(product);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-6 px-6 shadow-lg sticky top-0 z-50">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">🛍️ FABRI-DECO</h1>
          <p className="text-gray-300 text-lg">Trendy Wears & Accessories for Everyone</p>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50">
  {/* Header */}
  <header className="bg-black text-white py-4 px-6 shadow-md sticky top-0 z-50">
    <h1 className="text-3xl font-bold">FABRI-DECO</h1>
    <p className="text-sm text-gray-300 mt-1">
      Trendy wears for Men, Women & Kids
    </p>
  </header>

  {/* Sticky Category Bar */}
  <div className="sticky top-[72px] bg-gray-50 z-50 py-3 shadow-md overflow-x-auto whitespace-nowrap px-4">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() =>
          setSelectedCategory(selectedCategory === cat ? null : cat)
        }
        className={`inline-block mr-3 px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105
          ${
            selectedCategory === cat
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>

      {/* 4 Fixed Sections */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sectionProducts, idx) => (
          <section key={idx} className="w-full bg-gray-100 rounded-xl p-4 shadow-md">
            <Slider {...sliderSettings}>
              {sectionProducts.length > 0 ? (
                sectionProducts.map((product) => (
                  <div key={product._id} className="px-2">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                    )}
                    {product.video && (
                      <video
                        src={product.video}
                        controls
                        className="w-full h-80 object-cover rounded-xl"
                      />
                    )}
                    <div className="mt-2 text-center">
                      <h2 className="text-lg font-bold">{product.name}</h2>
                      <p className="text-gray-600">{product.category || "Uncategorized"}</p>
                      <p className="text-gray-800 font-semibold">₦{product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No products yet.</p>
              )}
            </Slider>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-4 mt-6">
        © {new Date().getFullYear()} FABRI-DECO. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;

