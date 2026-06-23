import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    throw error;
  }
);

// Get all products
export const getAllProducts = async (limit = 20) => {
  const response = await apiClient.get(`/products?limit=${limit}`);
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// Get all categories
export const getAllCategories = async () => {
  const response = await apiClient.get(`/products/categories`);
  return response.data;
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

// Sort products
export const getSortedProducts = async (sort = 'asc') => {
  const response = await apiClient.get(`/products?sort=${sort}`);
  return response.data;
};

// Get limited products
export const getLimitedProducts = async (limit = 10) => {
  const response = await apiClient.get(`/products?limit=${limit}`);
  return response.data;
};

// Get single category with sort
export const getCategorySorted = async (category, sort = 'asc') => {
  const response = await apiClient.get(`/products/category/${category}?sort=${sort}`);
  return response.data;
};
