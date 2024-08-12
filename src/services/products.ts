import axios from "axios";

export const getProduct = async (id: string | undefined) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

export const getAllProducts = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
