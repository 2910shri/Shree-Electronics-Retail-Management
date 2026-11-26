import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getRepairs,
  addRepair,
  updateRepair,
  deleteRepair,
  setAdminCredentials,
  checkAdmin,
  getLowStockProducts
} from "./api";
import "./App.css";
import Cart from "./Cart";
import Orders from "./Orders";


/* PRODUCT IMAGE MAP */

const productImages = {
 tv: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
   ac: "https://images.unsplash.com/photo-1581093458791-9d15482442f0?w=500",
   laptop: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
   fridge: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",
   mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
   fan: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500",
   washingmachine: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500",
   purifier: "https://images.unsplash.com/photo-1581574200052-04f7d9f9c94b?w=500"
};

function App() {

  const [section, setSection] = useState("stock");
  const [isAdmin, setIsAdmin] = useState(false);

  /* ADMIN LOGIN */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* PRODUCT STATES */

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");   // NEW

  /* REPAIR STATES */

  const [repairs, setRepairs] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [issue, setIssue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  /* FETCH DATA */

  useEffect(() => {
    fetchProducts();
    fetchRepairs();
    fetchLowStock();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch {
      setProducts([]);
    }
  };

  const fetchLowStock = async () => {
    try { setLowStockProducts(await getLowStockProducts(5)); } catch { setLowStockProducts([]); }
  };

  const fetchRepairs = async () => {
    try {
      const data = await getRepairs();
      setRepairs(data || []);
    } catch {
      setRepairs([]);
    }
  };

  /* ADMIN LOGIN: credentials are checked by Spring Security, not hardcoded in React. */
  const handleAdminLogin = async () => {
    const user = window.prompt("Admin username");
    if (!user) return;
    const pass = window.prompt("Admin password");
    if (!pass) return;
    try {
      setAdminCredentials(user, pass);
      await checkAdmin();
      setIsAdmin(true);
      alert("Admin login successful");
    } catch (error) {
      setAdminCredentials(null, null);
      alert("Invalid admin credentials or backend is unavailable.");
    }
  };

  const handleLogout = () => {
    setAdminCredentials(null, null);
    setIsAdmin(false);
    setSection("stock");
  };

  /* PRODUCT FUNCTIONS */

  const handleAddProduct = async () => {

    if (!name || !category || !price || !stock || !description) {
      alert("Fill all fields");
      return;
    }

    await addProduct({
      name,
      category,
      description, // NEW
      price: Number(price),
      stock: Number(stock)
    });

    fetchProducts();
    fetchLowStock();

    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription(""); // NEW
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
    fetchLowStock();
  };

  const handleBuyProduct = async (product) => {
    await handleAddToCart(product);
    setSection("cart");
  };

  /* REPAIR FUNCTIONS */

  const handleAddRepair = async () => {

    if (!customerName || !productName || !issue || !mobileNumber) {
      alert("Fill all fields");
      return;
    }

    await addRepair({
      customerName,
      productName,
      issue,
      status: "Pending",
      mobileNumber
    });

    fetchRepairs();

    setCustomerName("");
    setProductName("");
    setIssue("");
    setMobileNumber("");
  };

  const handleDeleteRepair = async (id) => {
    await deleteRepair(id);
    fetchRepairs();
  };

  const handleStatusChange = async (repair) => {

    const updatedRepair = {
      ...repair,
      status: "Completed"
    };

    await updateRepair(repair.id, updatedRepair);

    fetchRepairs();
  };

  // Add to cart function

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/cart`, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      });

      setCartCount(prev => prev + 1);

      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="container">

      <h1 className="title">⚡ Shree Electronics, Kadegaon</h1>

      <div className="glassCard" style={{
        padding: "25px",
        textAlign: "center",
        marginBottom: "25px"
      }}>
        <h2>Latest Electronics at Best Prices</h2>
        <p>📱 Mobiles | 📺 TVs | ❄️ AC | 🧺 Washing Machines</p>
      </div>

      {/* ADMIN LOGIN */}

      {!isAdmin && (
        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <button className="gradientBtn" onClick={handleAdminLogin}>
            Admin
          </button>
        </div>
      )}

      {isAdmin && (
        <button className="gradientBtn logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* NAVIGATION TABS */}

      <div className="tabs">

        <button
          className={`tabBtn ${section === "stock" ? "activeTab" : ""}`}
          onClick={() => setSection("stock")}
        >
          📦 Stock
        </button>

        <button
          className={`tabBtn ${section === "repair" ? "activeTab" : ""}`}
          onClick={() => setSection("repair")}
        >
          🔧 Repair
        </button>

        <button className={`tabBtn ${section === "cart" ? "activeTab" : ""}`} onClick={() => setSection("cart")}>🛒 Cart ({cartCount})</button>
        {isAdmin && <button className={`tabBtn ${section === "orders" ? "activeTab" : ""}`} onClick={() => setSection("orders")}>📋 Orders</button>}

      </div>

      {/* STOCK SECTION */}

      {section === "stock" && (

        <div>

          {isAdmin && lowStockProducts.length > 0 && <div className="glassCard" style={{padding:12,marginBottom:16}}><b>⚠ Low stock alert:</b> {lowStockProducts.map(p => `${p.name} (${p.stock})`).join(", ")}</div>}

          {isAdmin && (

            <div className="addProductBox glassCard">

              <input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

              <button className="gradientBtn addBtn" onClick={handleAddProduct}>
                Add Product
              </button>

            </div>

          )}

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "20px",
              flexWrap: "wrap"
            }}
          >

            <input
              type="text"
              placeholder="🔍 Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="mobile">Mobile</option>
              <option value="tv">TV</option>
              <option value="ac">AC</option>
              <option value="laptop">Laptop</option>
              <option value="fridge">Fridge</option>
            </select>

          </div>

          <div className="productGrid">


              {(products || [])
                .filter(product =>
                  product.name?.toLowerCase()
                  .includes(search.toLowerCase())
                )
                .filter(product =>
                  filterCategory === "all"
                    ? true
                    : product.category?.toLowerCase() === filterCategory
                )
                .map((product) => {

                  const image =
                    productImages[product.category?.toLowerCase()] ||
                    "https://cdn-icons-png.flaticon.com/512/1046/1046857.png";

              return (

                <div className="productCard glassCard" key={product.id}>

                  <img
                    src={image}
                    alt={product.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedProduct(product)}
                  />

                  <h4>{product.name}</h4>

                  <p className="description">{product.description}</p>

                  <p className="price">₹{product.price}</p>

                  <p>
                    {product.stock > 0
                      ? <span className="available">Available</span>
                      : <span className="out">Out Of Stock</span>}
                  </p>

                  {product.stock > 0 && (

                    <>

                      <button
                        className="gradientBtn buyBtn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </button>

                      <button
                        className="gradientBtn"
                        onClick={() => handleBuyProduct(product)}
                      >
                        Buy Now
                      </button>

                    </>

                  )}

                  {isAdmin && (
                    <button
                      className="gradientBtn deleteBtn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  )}

                </div>

              );
            })}

          </div>

        </div>

      )}

      {/* REPAIR SECTION */}

      {section === "repair" && (

        <div>

          <div className="repairForm glassCard">

            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <input
              placeholder="Issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <input
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />

            <button className="gradientBtn addBtn" onClick={handleAddRepair}>
              Add Repair
            </button>

          </div>

          {(repairs || []).map((repair) => (

            <div className="repairCard glassCard" key={repair.id}>

              <p><b>{repair.customerName}</b></p>
              <p>{repair.productName}</p>
              <p>{repair.issue}</p>
              <p>{repair.mobileNumber}</p>
              <p>Status: {repair.status}</p>

              {isAdmin && repair.status === "Pending" && (
                <button className="gradientBtn completeBtn" onClick={() => handleStatusChange(repair)}>Mark Completed</button>
              )}
              {isAdmin && <button className="gradientBtn deleteBtn" onClick={() => handleDeleteRepair(repair.id)}>Delete</button>}

            </div>


          ))}

        </div>



      )}
      {/* CART SECTION */}

      {section === "cart" && <Cart />}
      {section === "orders" && isAdmin && <Orders />}
      {selectedProduct && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >

          <div
            style={{
              background: "white",
              color: "black",
              padding: "30px",
              borderRadius: "15px",
              width: "350px"
            }}
          >

            <h2>{selectedProduct.name}</h2>

            <p>{selectedProduct.description}</p>

            <p>
              <b>Category:</b> {selectedProduct.category}
            </p>

            <p>
              <b>Price:</b> ₹{selectedProduct.price}
            </p>

            <p>
              <b>Stock:</b> {selectedProduct.stock}
            </p>

            <button
              className="gradientBtn"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}
      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px"
        }}
      >
        <h3>Shree Electronics</h3>

        <p>Kadegaon, Maharashtra</p>

        <p>📞 +91 9359521516</p>

        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );

}






export default App;