import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Admin from "./Admin";

const API_URL = "https://fashionstorebackend-91gq.onrender.com";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🛍️ Fashion Store</h1>
        <p>Trendy wears for everyone — Men, Women, and Kids.</p>
        <Link className="admin-link" to="/admin">
          Go to Admin Page
        </Link>
      </header>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₦{product.price}</p>
              <small>{product.category}</small>
            </div>
          ))
        ) : (
          <p>No products yet.</p>
        )}
      </div>

      <footer>© {new Date().getFullYear()} Fashion Store. All rights reserved.</footer>
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
