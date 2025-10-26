import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fashionstorebackend-91gq.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🛍️ Fashion Store</h1>
        <p>Trendy wears for everyone — Men, Women, and Kids.</p>
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
          <p>Loading products...</p>
        )}
      </div>

      <footer>© {new Date().getFullYear()} Fashion Store. All rights reserved.</footer>
    </div>
  );
}

export default App;
