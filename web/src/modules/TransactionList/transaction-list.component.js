import { Button } from 'antd';
import React, { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { openInfoNotification } from '../../shared/helpers/notifications.helper';
import addTransactionMutation from '../../shared/requests/transaction/addTransactionMutation';
import transactionQuery, {
  TRANSACTION_QUERY_NAME,
} from '../../shared/requests/transaction/transactionQuery';
import AddTransactionModal from '../NewTransactionModal/new-transaction-modal.component';

const TransactionList = () => {
  const { data } = useQuery(TRANSACTION_QUERY_NAME, transactionQuery);
  const addTransMutation = useMutation(addTransactionMutation);
  const [
    isAddTransactionModalVisible,
    setIsAddTransactionModalVisible,
  ] = useState(false);

  const onAddTransaction = useCallback(async () => {
    setIsAddTransactionModalVisible(true);
  }, [setIsAddTransactionModalVisible]);

  const onTransactionCanceled = useCallback(() => {
    setIsAddTransactionModalVisible(false);
  }, [setIsAddTransactionModalVisible]);

  const onTransactionAdded = useCallback(
    async (transaction) => {
      setIsAddTransactionModalVisible(false);

      const response = await addTransMutation.mutateAsync(transaction);
      openInfoNotification('Transaction has been added');
    },
    [addTransMutation]
  );

  return (
    <div>
      <Button onClick={onAddTransaction}>Add</Button>
      <AddTransactionModal
        visible={isAddTransactionModalVisible}
        onCancel={onTransactionCanceled}
        onSubmit={onTransactionAdded}
      />
    </div>
  );
};

export default TransactionList;
