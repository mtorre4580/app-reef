import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

/**
 * Retrieve all items
 * @returns {Promise<Object[]>}
 */
export async function getAll() {
  const { data } = await axios.get(`${BASE_URL}/items`);
  return data;
}

/**
 * Retrieve more items by pagination
 * @param {Object}
 * @returns {Promise<Object[]>}
 */
export async function getMore(params) {
  const { data } = await axios.get(`${BASE_URL}/items`, { params });
  return data;
}

/**
 *
 * @param {string} type
 * @returns {Promise<Object[]>}
 */
export async function filterByType(type) {
  const { data } = await axios.get(`${BASE_URL}/items`, { params: { type } });
  return data;
}
