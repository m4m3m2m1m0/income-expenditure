import { baseAPI } from '../../components/api-client.component';
import pathBuilder from '../../helpers/pathBuilder';

export const TRANSACTION_TYPE_QUERY_NAME = 'transactionTypeQuery';

const transactionTypeQuery = async () => {
  const path = pathBuilder('/transaction-type');
  const { data } = await baseAPI.get(path);

  return data;
};

export default transactionTypeQuery;
