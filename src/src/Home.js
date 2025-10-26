import React, { useEffect, useState } from "react";

const API_URL = "https://fashionstorebackend-91gq.onrender.com";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <header>
        <h1>🛍️ Fashion Store</h1>
        <p>Stylish clothes for all — Men, Women & Kids</p>
      </header>
      <div className="product-grid">
        {products.length ? (
          products.map((p) => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₦{p.price}</p>
              <small>{p.category}</small>
            </div>
          ))
        ) : (
          <p>No products yet.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
