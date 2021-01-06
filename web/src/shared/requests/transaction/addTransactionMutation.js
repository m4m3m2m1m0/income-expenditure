import { baseAPI } from '../../components/api-client.component';

const addTransactionMutation = async (req) => {
  return await baseAPI.post('/transaction', req);
};

export default addTransactionMutation;
