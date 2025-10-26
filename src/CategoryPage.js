import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://fashionstorebackend-1-sa6g.onrender.com";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        const filtered = res.data.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [category]);

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

  const sections = [[], [], [], []];
  products.forEach((p, idx) => sections[idx % 4].push(p));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-6 px-6 shadow-md sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-center">
          {category.toUpperCase()}
        </h1>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <p className="text-gray-600">{product.category}</p>
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
      </div>
    </div>
  );
}

export default CategoryPage;
