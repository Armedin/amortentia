import {
  CreateProduct,
  Product,
  UpdateProduct,
} from '@admin/interfaces/product';
import {
  CreateProductCategory,
  ProductCategory,
} from '@admin/interfaces/product-category';
import apiAxios from '@admin/lib/api';

const createProduct = (data: CreateProduct) => {
  return apiAxios.post('/products', data);
};

const getAllProducts = (filters?: any) => {
  return apiAxios.get<Product[], any>('/products', { params: filters });
};

const getProductById = (id: string) => {
  return apiAxios.get<Product, any>(`/products/${id}`);
};

const updateProductById = (id: string, data: UpdateProduct) => {
  return apiAxios.put<Product, any>(`/products/${id}`, data);
};

const getCategoryById = (id: string) => {
  return apiAxios.get<ProductCategory[], any>(`/product-categories/id/${id}`);
};

const getAllCategories = () => {
  return apiAxios.get<ProductCategory[], any>('/product-categories');
};

const getAllCategoriesWithCount = () => {
  return apiAxios.get<ProductCategory[], any>(
    '/product-categories/with-products-count'
  );
};

const createCategory = (data: CreateProductCategory) => {
  return apiAxios.post<ProductCategory, any>('/product-categories', data);
};

const deleteProductById = (id: string) => {
  return apiAxios.delete<any, any>(`/products/${id}`);
};

const getRecommendedProducts = () => {
  return apiAxios.get<any, any>('/products/recommended');
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  getCategoryById,
  getAllCategories,
  getAllCategoriesWithCount,
  updateProductById,
  createCategory,
  deleteProductById,
  getRecommendedProducts,
};
