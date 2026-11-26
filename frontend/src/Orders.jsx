import React,{useEffect,useState} from "react";
import {getOrders} from "./api";
export default function Orders(){
 const [orders,setOrders]=useState([]),[error,setError]=useState("");
 useEffect(()=>{getOrders().then(setOrders).catch(()=>setError("Unable to load orders. Please sign in as admin."));},[]);
 return <section><h2>Order History</h2>{error&&<p>{error}</p>}{!error&&!orders.length&&<p>No orders have been placed yet.</p>}
 {orders.map(o=><article className="glassCard" style={{padding:16,marginBottom:12}} key={o.id}><h3>Order #{o.id}</h3><p><b>Customer:</b> {o.customerName} | <b>Status:</b> {o.status}</p><p>{o.city} · {o.mobile} · {o.paymentMethod}</p><p><b>Total:</b> ₹{Number(o.totalPrice).toFixed(2)}</p><ul>{(o.items||[]).map((i,index)=><li key={`${i.productId}-${index}`}>{i.productName} × {i.quantity} — ₹{(i.unitPrice*i.quantity).toFixed(2)}</li>)}</ul><small>{o.createdAt?new Date(o.createdAt).toLocaleString():""}</small></article>)}
 </section>;
}
