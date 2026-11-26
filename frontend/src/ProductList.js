import React from "react";

export default function ProductList({ products = [], onAddToCart }) {
  if (!products.length) return <p>No products found.</p>;
  return (
    <div className="productGrid">
      {products.map((product) => (
        <article className="productCard glassCard" key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
          <p>{product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}</p>
          <button className="gradientBtn" disabled={product.stock < 1} onClick={() => onAddToCart?.(product)}>Add to Cart</button>
        </article>
      ))}
    </div>
  );
}
