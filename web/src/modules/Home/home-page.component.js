import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useQuery } from 'react-query';
import userQuery, {
  USER_QUERY_NAME,
} from '../../shared/api/requests/user/userQuery';

const LoginContainer = styled.div`
  margin: auto;
  width: 50%;
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-bottom: 100px;
  padding: 50px;
`;

const HomePage = () => {
  const { data, refetch } = useQuery(USER_QUERY_NAME, userQuery, {
    manual: true,
  });

  const onBtn = () => {
    refetch();
  };

  return (
    <LoginContainer>
      <p>HI</p>
      <Button onClick={onBtn}>Click</Button>
      {JSON.stringify(data)}
    </LoginContainer>
  );
};

export default HomePage;
