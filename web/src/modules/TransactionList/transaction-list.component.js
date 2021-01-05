import { Button } from 'antd';
import React, { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import addTransactionMutation from '../../shared/requests/transaction/addTransactionMutation';

const TransactionList = () => {
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
