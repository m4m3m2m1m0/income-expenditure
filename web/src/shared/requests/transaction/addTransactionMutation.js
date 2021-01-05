import { baseAPI } from '../../components/api-client.component';

const addTransactionMutation = async (req) => {
  const data = await baseAPI.post('/transaction', req);
  return data;
};

export default addTransactionMutation;
