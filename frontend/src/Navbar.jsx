import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.navbar}>
      <h2>Electronic Shop</h2>

      <div>
        <Link to="/">Home</Link> {" | "}
        <Link to="/cart">🛒 Cart</Link>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#333",
    color: "white"
  }
};

export default Navbar;