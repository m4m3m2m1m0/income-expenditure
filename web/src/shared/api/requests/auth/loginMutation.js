import baseAPI from '../../base-api';

export const LOGIN_MUTATION_NAME = 'loginMutation';

const loginMutation = async (credentials) => {
  const data = await baseAPI.post('/auth/login', credentials);
  return data;
};

export default loginMutation;
