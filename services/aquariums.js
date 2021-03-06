import axios from 'axios';

const API_AQUARIUMS = `${process.env.API_URL}/aquariums`;

export async function getAquarium(cookie = null) {
  const { data } = await axios.get(API_AQUARIUMS, { withCredentials: true, headers: { cookie } });
  return data;
}

export async function registerParameters(idAquarium, date, parameters) {
  const { data } = await axios.patch(`${API_AQUARIUMS}/${idAquarium}/${date}`, parameters);
  return data;
}

export async function updateParameter(idAquarium, date, parameter) {
  const info = { [parameter.type]: parseFloat(parameter.value) };
  const { data } = await axios.patch(`${API_AQUARIUMS}/${idAquarium}/${date}`, info);
  return data;
}

export async function registerAquarium(request) {
  const { data } = await axios.post(API_AQUARIUMS, request);
  return data;
}
