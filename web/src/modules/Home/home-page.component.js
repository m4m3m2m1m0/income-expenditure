import React from 'react';
import styled from 'styled-components';

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
  return (
    <LoginContainer>
      <p>HI</p>
    </LoginContainer>
  );
};

export default HomePage;
