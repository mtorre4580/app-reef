import axios from 'axios';

const API_AUTH = `https://reef-corals.vercel.app/api/auth`;

export async function login(user) {
  const { data } = await axios.post(API_AUTH, user);
  return data;
}

export async function logout() {
  const { data } = await axios.delete(API_AUTH);
  return data;
}
