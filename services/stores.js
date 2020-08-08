import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export async function getAll() {
  const { data } = await axios.get(`${BASE_URL}/stores`);
  return data;
}

export async function getClosest(latitude, longitude) {
  const { data } = await axios.get(`${BASE_URL}/stores`);
  return data;
}
