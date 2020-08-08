import axios from 'axios';

const API_ITEMS = `https://reef-corals.vercel.app/api/items`;

export async function getAll() {
  const { data } = await axios.get(API_ITEMS);
  return data;
}

export async function getMore(params) {
  const { data } = await axios.get(API_ITEMS, { params });
  return data;
}

export async function filterByType(type) {
  const { data } = await axios.get(API_ITEMS, { params: { type } });
  return data;
}

export async function search(q) {
  const { data } = await axios.get(API_ITEMS, { params: { q } });
  return data;
}

export async function getDetail(id) {
  const { data } = await axios.get(`${API_ITEMS}/${id}`);
  return data;
}
