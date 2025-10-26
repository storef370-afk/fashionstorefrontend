import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://fashionstorebackend-1-sa6g.onrender.com";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const settings = {
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

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {products.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Slider {...settings}>
              {product.image && (
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
              {product.video && (
                <div>
                  <video
                    src={product.video}
                    controls
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
            </Slider>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.category || "Uncategorized"}</p>
              <p className="text-gray-800 font-semibold">₦{product.price}</p>
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-black text-gray-400 text-center py-4 mt-6">
        © {new Date().getFullYear()} Fashion Store. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
