import { Button } from 'antd';
import React, { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import addTransactionMutation from '../../shared/requests/transaction/addTransactionMutation';
import transactionQuery, {
  TRANSACTION_QUERY_NAME,
} from '../../shared/requests/transaction/transactionQuery';

const TransactionList = () => {
  const { data } = useQuery(TRANSACTION_QUERY_NAME, () => transactionQuery(1));
  const addTransMutation = useMutation(addTransactionMutation);

  const onAddTransaction = useCallback(async () => {
    await addTransMutation.mutateAsync({ name: 'test', amount: 21.37 });
  }, [addTransMutation]);

  return (
    <div>
      <Button onClick={onAddTransaction}>Add</Button>
    </div>
  );
};

export default TransactionList;
