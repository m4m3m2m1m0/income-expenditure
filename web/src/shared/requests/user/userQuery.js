import { baseAPI } from '../../components/api-client.component';

export const USER_QUERY_NAME = 'userQuery';

const userQuery = async () => {
  const { data } = await baseAPI.get('/user');

  return data;
};

export default userQuery;
