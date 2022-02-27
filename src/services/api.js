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

const fetchProdutoById = async (id) => {
  const res = await api.get(`/produtos/${id}`);
  return res.data;
};

const editProduto = async ({ id, nome, descricao, preco, estoque }) => {
  const res = await api.put(`/produtos/${id}`, {
    nome,
    descricao,
    preco,
    estoque,
  });
  return res.data;
};

const deleteProduto = async (id) => {
  const res = await api.delete(`/produtos/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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

const getEstimativaEntrega = async (cep) => {
  const res = await api.get(`/entregas?cep=${cep}`);
  return res.data;
};
// ******************* END *********************

const apiMethods = {
  createProduto,
  deleteProduto,
  editProduto,
  fetchCompras,
  fetchProdutoById,
  fetchProdutos,
  getEstimativaEntrega,
  getImageUrl,
};

export default apiMethods;
