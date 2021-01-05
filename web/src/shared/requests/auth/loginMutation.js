import { baseAPI } from '../../components/api-client.component';

const loginMutation = async (credentials) => {
  const data = await baseAPI.post('/auth/login', credentials);
  return data;
};

export default loginMutation;
