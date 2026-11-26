import axios from "axios";
export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api" });
export const setAdminCredentials = (username, password) => {
  API.defaults.auth = username ? { username, password } : undefined;
};
export const checkAdmin = async () => (await API.get("/admin/check")).data;
export const getProducts = async () => (await API.get("/products")).data;
export const getLowStockProducts = async (threshold = 5) => (await API.get(`/products/low-stock?threshold=${threshold}`)).data;
export const addProduct = async (product) => (await API.post("/products", product)).data;
export const updateProduct = async (id, product) => (await API.put(`/products/${id}`, product)).data;
export const deleteProduct = async (id) => API.delete(`/products/${id}`);
export const getRepairs = async () => (await API.get("/repairs")).data;
export const addRepair = async (repair) => (await API.post("/repairs", repair)).data;
export const updateRepair = async (id, repair) => (await API.put(`/repairs/${id}`, repair)).data;
export const deleteRepair = async (id) => API.delete(`/repairs/${id}`);
export const getOrders = async () => (await API.get("/orders")).data;
