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

const fetchProdutos = async (page) => {
  const res = await api.get(`/produtos?page=${page ? page : 1}`);
  return res.data;
};

const getImageUrl = (produtoId) => {
  return `${process.env.API_BASE_URL}/produtos/${produtoId}/image`;
};

const apiMethods = {
  fetchProdutos,
  getImageUrl,
};

export default apiMethods;
