import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useQuery } from 'react-query';
import userQuery, {
  USER_QUERY_NAME,
} from '../../shared/requests/user/userQuery';
import TransactionList from '../TransactionList/transaction-list.component';

const LoginContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-bottom: 100px;
  padding: 50px;
`;

const HomePage = () => {
  return (
    <LoginContainer>
      <TransactionList />
    </LoginContainer>
  );
};

export default HomePage;
