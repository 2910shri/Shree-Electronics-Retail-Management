import React, { useState } from "react";

function AddProduct({ addProduct }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("SHOPPING");

  // ✅ NEW STATES
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({
      name,
      price,
      stock,
      category,
      description,   // ✅ added
      imageUrl       // ✅ added
    });

    // Reset fields
    setName("");
    setPrice("");
    setStock("");
    setCategory("SHOPPING");
    setDescription("");  // ✅ reset
    setImageUrl("");     // ✅ reset
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="SHOPPING">Shopping</option>
        <option value="REPAIRING">Repairing</option>
      </select>

      {/* ✅ NEW INPUT */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* ✅ NEW INPUT */}
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddProduct;