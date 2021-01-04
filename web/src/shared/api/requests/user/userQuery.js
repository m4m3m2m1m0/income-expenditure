import baseAPI from '../../base-api';
import pathBuilder from '../../../utils/pathBuilder';

export const USER_QUERY_NAME = 'userQuery';

const userQuery = async () => {
  const { data } = await baseAPI.get('/user');

  return data;
};

export default userQuery;
