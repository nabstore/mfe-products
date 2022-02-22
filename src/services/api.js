import axios from "axios";
import { getToken } from "@nabstore/utils";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

const createProduto = async (formData) => {
  const res = await api.post(`/produtos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const fetchProdutos = async (page) => {
  const res = await api.get(`/produtos?page=${page ? page : 1}`);
  return res.data;
};

const getImageUrl = (produtoId) => {
  return `${process.env.API_BASE_URL}/produtos/${produtoId}/image`;
};

// **************** CHECKOUT ******************
// TODO - Usar fragmentos do checkout
const fetchCompras = async () => {
  const res = await api.get(`/compras`);
  return res.data;
};
// ******************* END *********************

const apiMethods = {
  createProduto,
  fetchCompras,
  fetchProdutos,
  getImageUrl,
};

export default apiMethods;
