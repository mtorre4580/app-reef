import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export async function getAll() {
  const { data } = await axios.get(`${BASE_URL}/items`);
  return data;
}

export async function getMore(params) {
  const { data } = await axios.get(`${BASE_URL}/items`, { params });
  return data;
}

export async function filterByType(type) {
  const { data } = await axios.get(`${BASE_URL}/items`, { params: { type } });
  return data;
}

export async function search(q) {
  const { data } = await axios.get(`${BASE_URL}/items`, { params: { q } });
  return data;
}
