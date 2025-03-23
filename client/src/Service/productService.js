import axios from "axios";
import { getToken } from "../utils/AuthHelper";

// BASE_URL from your .env file
const API_URL = import.meta.env.VITE_APP_API_URL;
const PRODUCT_URL = `${API_URL}/product`;

// List Products
const listProducts = async () => {
  const response = await axios.get(
    `${PRODUCT_URL}/list`,
     getToken()
  );
  return response.data;
};

// Add Product (with multiple images)
const addProduct = async (formData) => {
  const response = await axios.post(`${PRODUCT_URL}/add`, formData, getToken(),
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// View Product by ID
const viewProduct = async (productId) => {
  const response = await axios.get(
    `${PRODUCT_URL}/view/${productId}`,
    getToken()
  );
  return response.data;
};

// Edit Product (with multiple images)
const editProduct = async (productId, formData) => {
  const response = await axios.put(
    `${PRODUCT_URL}/edit/${productId}`,
    formData,
    getToken()
  );
  return response.data;
};

// Delete Product
const deleteProduct = async (productId) => {
  const response = await axios.post(
    `${PRODUCT_URL}/delete/${productId}`,
    {},
    getToken()
  );
  return response.data;
};

export { listProducts, addProduct, editProduct, viewProduct, deleteProduct };
