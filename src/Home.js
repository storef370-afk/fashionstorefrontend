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
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    swipeToSlide: true,
    pauseOnHover: true,
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  const sections = [[], [], [], []];
  filteredProducts.forEach((product, idx) => {
    sections[idx % 4].push(product);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black text-white py-8 px-6 shadow-lg z-50">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">
            🛍️ FABRI-DECO
          </h1>
          <p className="text-gray-300 text-lg">
            Trendy Wears & Accessories for Everyone
          </p>
        </div>
      </header>

      {/* Category Bar (moved further down to avoid header overlap) */}
      <div className="fixed top-[160px] left-0 w-full bg-white z-40 py-3 shadow-md overflow-x-auto whitespace-nowrap px-4 border-t border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
            className={`inline-block mr-3 px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105 ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main content (push further down so nothing overlaps) */}
      <main className="pt-[240px] pb-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sectionProducts, idx) => (
          <section
            key={idx}
            className="w-full bg-gray-100 rounded-xl p-4 shadow-md"
          >
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
                      <p className="text-gray-600">
                        {product.category || "Uncategorized"}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        ₦{product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No products yet.</p>
              )}
            </Slider>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-4 mt-6">
        © {new Date().getFullYear()} FABRI-DECO. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
