import { Button, Col, List, Result, Row, Spin } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { openInfoNotification } from '../../shared/helpers/notifications.helper';
import addTransactionMutation from '../../shared/requests/transaction/addTransactionMutation';
import transactionQuery, {
  TRANSACTION_QUERY_NAME,
} from '../../shared/requests/transaction/transactionQuery';
import AddTransactionModal from './new-transaction-modal.component';
import styled from 'styled-components';
import moment from 'moment';

const ListContainer = styled.div`
  height: 300px;
  width: 300px;
  overflow: auto;
  margin-bottom: 20px;
`;

const transactionsToTake = 10;

const getTransactionList = (data) => {
  const list = [];

  if (data && data.pages) {
    data.pages.forEach((p) => list.push(...p.transactions));
  }

  return list;
};

const getLastPage = (data) => {
  if (data && data.pages) {
    return data.pages[data.pages.length - 1];
  }

  return null;
};

const hasMore = (data) => {
  const lastPage = getLastPage(data);
  return lastPage ? lastPage.hasMore : false;
};

const TransactionList = ({ transactionTypeId }) => {
  const [isExpanded, setIsExpanded] = useState({});

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    TRANSACTION_QUERY_NAME + transactionTypeId,
    ({ pageParam }) =>
      transactionQuery({
        take: transactionsToTake,
        skip: pageParam ? pageParam.skip : 0,
        orderBy: 'amount',
        orderDir: 'asc',
        typeId: transactionTypeId,
      }),
    {
      getNextPageParam: (lastPage) => {
        return { skip: lastPage ? lastPage.toSkip : 0 };
      },
    }
  );

  const onLoadMoreTransactions = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleExpand = useCallback(
    (itemId) => {
      setIsExpanded((cur) => {
        const next = { ...cur };
        next[itemId] = !cur[itemId];
        return next;
      });
    },
    [setIsExpanded]
  );

  return (
    <ListContainer>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={onLoadMoreTransactions}
        hasMore={!isFetching && hasMore(data)}
        useWindow={false}
      >
        <List
          dataSource={getTransactionList(data)}
          renderItem={(item) => (
            <List.Item key={item.id} style={{ display: 'block' }}>
              {/* <Button onClick={() => handleExpand(item.id)}>Test</Button> */}
              <Row>
                <Col span={6}>
                  <strong>{item.amount} zł</strong>
                </Col>
                <Col span={6}>{item.description}</Col>
                <Col span={6}>{moment(item.date).format('D MM')}</Col>
              </Row>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </ListContainer>
  );
};

export default TransactionList;
