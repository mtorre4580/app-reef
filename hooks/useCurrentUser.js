import useSWR from 'swr';
import axios from 'axios';

const getCurrentUser = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/users', getCurrentUser);
  const user = data?.user;
  return [user, { mutate }];
}
