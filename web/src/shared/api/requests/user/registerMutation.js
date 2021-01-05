import { baseAPI } from '../../../components/api-client.component';

const registerMutation = async (user) => {
  const data = await baseAPI.post('/user/register', user);
  return data;
};

export default registerMutation;
