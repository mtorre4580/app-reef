import axios from 'axios';

const API_FAVORITES = `${process.env.API_URL}/favorites`;

export async function addFavorite(id) {
  const { data } = await axios.patch(`${API_FAVORITES}/${id}`);
  return data;
}

export async function getAll() {
  const { data } = await axios.get(API_FAVORITES);
  return data;
}
