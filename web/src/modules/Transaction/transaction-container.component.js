import { Button, Tabs } from 'antd';
import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { openInfoNotification } from '../../shared/helpers/notifications.helper';
import addTransactionMutation from '../../shared/requests/transaction/addTransactionMutation';
import AddTransactionModal from './new-transaction-modal.component';
import TransactionList from './transaction-list.component';
import { TRANSACTION_QUERY_NAME } from '../../shared/requests/transaction/transactionQuery';

const TransactionContainer = () => {
  const queryClient = useQueryClient();

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

      await addTransMutation.mutateAsync(transaction);
      queryClient.refetchQueries([TRANSACTION_QUERY_NAME + transaction.typeId]);

      openInfoNotification('Transaction has been added');
    },
    [addTransMutation]
  );

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Expenditure" key="1">
          <TransactionList transactionTypeId="1" />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Income" key="2">
          <TransactionList transactionTypeId="2" />
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={onAddTransaction}>Add</Button>
      <AddTransactionModal
        visible={isAddTransactionModalVisible}
        onCancel={onTransactionCanceled}
        onSubmit={onTransactionAdded}
      />
    </div>
  );
};

export default TransactionContainer;
