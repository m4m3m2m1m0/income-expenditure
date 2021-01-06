import { baseAPI } from '../../components/api-client.component';
import pathBuilder from '../../helpers/pathBuilder';

export const TRANSACTION_QUERY_NAME = 'transactionQuery';

const transactionQuery = async (id) => {
  const path = pathBuilder('/transaction', { id });
  const { data } = await baseAPI.get(path);

  return data;
};

export default transactionQuery;
