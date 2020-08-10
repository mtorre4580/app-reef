import axios from 'axios';

const API_AUTH = `https://reef-corals.vercel.app/api/users`;

export async function create(user) {
  const { data } = await axios.post(API_AUTH, user);
  return data;
}
