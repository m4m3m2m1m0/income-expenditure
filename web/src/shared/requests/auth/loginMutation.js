import { baseAPI } from '../../components/api-client.component';

const loginMutation = async (credentials) => {
  return await baseAPI.post('/auth/login', credentials);
};

export default loginMutation;
