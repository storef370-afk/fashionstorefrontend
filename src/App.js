import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // replace with your Render URL later
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🛍️ Fashion Store</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt={p.name}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <h3>{p.name}</h3>
              <p>{p.category}</p>
              <p>${p.price}</p>
            </div>
          ))
        ) : (
          <p>No products yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
