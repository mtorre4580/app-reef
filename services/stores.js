import axios from 'axios';

const API_STORES = `${process.env.API_URL}/stores`;

export async function getAll() {
  const { data } = await axios.get(API_STORES);
  return data;
}

export async function getClosest(latitude, longitude) {
  const { data } = await axios.get(API_STORES, { params: { latitude, longitude } });
  return data;
}
