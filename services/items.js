import axios from 'axios';

const API_ITEMS = `${process.env.API_URL}/items`;

export async function getAll(cookie = null) {
  const { data } = await axios.get(API_ITEMS, { withCredentials: true, headers: { cookie } });
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
  const { data } = await axios.get(API_ITEMS, { params: { q: q.trim() } });
  return data;
}

export async function getDetail(id) {
  const { data } = await axios.get(`${API_ITEMS}/${id}`);
  return data;
}
