import axios from 'axios';

const API_AUTH = 'https://reef-corals.vercel.app/api/auth';

export async function login(user) {
  const { data } = await axios.post(API_AUTH, user);
  return data;
}
