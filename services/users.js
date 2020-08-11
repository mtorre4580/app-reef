import axios from 'axios';

const API_AUTH = `${process.env.API_URL}/users`;

export async function create(user) {
  const { data } = await axios.post(API_AUTH, user);
  return data;
}
