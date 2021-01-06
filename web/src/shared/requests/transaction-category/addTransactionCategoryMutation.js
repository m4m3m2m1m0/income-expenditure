import { baseAPI } from '../../components/api-client.component';

const addTransactionCategoryMutation = async (req) => {
  return await baseAPI.post('/transaction-category', req);
};

export default addTransactionCategoryMutation;
