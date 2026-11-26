import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
function Cart() {
 const [cartItems,setCartItems]=useState([]),[paymentMethod,setPaymentMethod]=useState("COD"),[showAddressForm,setShowAddressForm]=useState(false),[busy,setBusy]=useState(false);
 const [address,setAddress]=useState({name:"",email:"",mobile:"",addressLine:"",city:"",pincode:""});
 const loadCart=async()=>{try{const r=await axios.get(`${BASE}/cart`);setCartItems(r.data||[]);}catch(e){console.error(e);}};
 useEffect(()=>{loadCart();},[]);
 const removeItem=async(id)=>{try{await axios.delete(`${BASE}/cart/${id}`);await loadCart();}catch(e){alert(e.response?.data?.message||"Could not remove item");}};
 const total=cartItems.reduce((s,i)=>s+(Number(i.quantity)||0)*(Number(i.price)||0),0);
 const confirmOrder=async()=>{
  if(!address.name||!address.email||!address.mobile||!address.addressLine||!address.city||!address.pincode){alert("Please fill all delivery details");return;}
  setBusy(true);
  try{
   const payload={customerName:address.name,customerEmail:address.email,mobile:address.mobile,addressLine:address.addressLine,city:address.city,pincode:address.pincode,paymentMethod,items:cartItems.map(i=>({productId:i.productId,quantity:i.quantity}))};
   const response=await axios.post(`${BASE}/orders`,payload);
   alert(`Order #${response.data.id} placed successfully. Total: ₹${response.data.totalPrice}.`);
   setCartItems([]);setShowAddressForm(false);setAddress({name:"",email:"",mobile:"",addressLine:"",city:"",pincode:""});await loadCart();
  }catch(e){alert(e.response?.data?.message||e.response?.data?.detail||"Order could not be placed. Please check stock and try again.");await loadCart();}
  finally{setBusy(false);}
 };
 return <div className="cartContainer"><h2>🛒 My Cart</h2>
  {!cartItems.length?<p>Your cart is empty.</p>:<>
   <div style={{overflowX:"auto"}}><table border="1" cellPadding="10" width="100%"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Action</th></tr></thead><tbody>
   {cartItems.map(i=><tr key={i.cartId}><td>{i.productName}</td><td>₹{i.price}</td><td>{i.quantity}</td><td>₹{(i.price*i.quantity).toFixed(2)}</td><td><button onClick={()=>removeItem(i.cartId)}>Remove</button></td></tr>)}
   </tbody></table></div>
   <h3>Total Amount: ₹{total.toFixed(2)}</h3>
   <label>Payment method&nbsp;<select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}><option value="COD">Cash on Delivery</option><option value="UPI">UPI (payment handled offline)</option></select></label>
   <button className="gradientBtn" onClick={()=>setShowAddressForm(true)}>Continue to Checkout</button>
   {showAddressForm&&<div className="glassCard" style={{padding:20,marginTop:20}}><h3>Delivery Address</h3>
    {[["name","Full Name"],["email","Email Address"],["mobile","10-digit Mobile Number"],["addressLine","Full Address"],["city","City"],["pincode","6-digit Pincode"]].map(([key,placeholder])=>key==="addressLine"?<textarea key={key} placeholder={placeholder} value={address[key]} onChange={e=>setAddress({...address,[key]:e.target.value})}/>:<input key={key} type={key==="email"?"email":"text"} placeholder={placeholder} value={address[key]} onChange={e=>setAddress({...address,[key]:e.target.value})}/>)}
    <button className="gradientBtn" disabled={busy} onClick={confirmOrder}>{busy?"Placing Order...":"Confirm Order"}</button>
   </div>}
  </>}
 </div>;
}
export default Cart;
