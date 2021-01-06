import { baseAPI } from '../../components/api-client.component';
import pathBuilder from '../../helpers/pathBuilder';

export const TRANSACTION_CATEGORY_QUERY_NAME = 'transactionCategoryQuery';

const transactionCategoryQuery = async () => {
  const path = pathBuilder('/transaction-category');
  const { data } = await baseAPI.get(path);

  return data;
};

export default transactionCategoryQuery;
