import { baseAPI } from '../../components/api-client.component';
import pathBuilder from '../../helpers/pathBuilder';

export const TRANSACTION_QUERY_NAME = 'transactionQuery';

const transactionQuery = async (params) => {
  const path = pathBuilder('/transaction', params);
  const { data } = await baseAPI.get(path);

  return data;
};

export default transactionQuery;
