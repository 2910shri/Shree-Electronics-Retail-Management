import axios from "axios";

await axios.post("http://localhost:8080/api/cart", {
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: 1
});