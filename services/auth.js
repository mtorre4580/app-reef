import axios from 'axios';

const API_AUTH = 'http://localhost:3000/api/auth'; //`https://reef-corals.vercel.app/api/auth`;

export async function login(user) {
  const { data } = await axios.post(API_AUTH, user);
  return data;
}

export async function logout() {
  const { data } = await axios.delete(API_AUTH);
  return data;
}
