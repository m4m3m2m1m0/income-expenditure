import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Input, Form, Space } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import loginMutation from '../../shared/requests/auth/loginMutation';
import { HOME_ROUTE, REGISTER_ROUTE } from '../../shared/const/routes.const';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';

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

const CustomInput = styled(Input)`
  width: 300px;
`;

const LoginPage = () => {
  const [form] = Form.useForm();
  const logMutation = useMutation(loginMutation);
  const authContext = useContext(AuthContext);
  const [redirectToHomePage, setRedirectToHomePage] = useState(
    authContext.isAuth
  );
  const [registerRedirect, setRegisterRedirect] = useState(false);

  const onFormSubmit = useCallback(
    async (credentials) => {
      const response = await logMutation.mutateAsync(credentials);
      authContext.login(response.data);
      setRedirectToHomePage(true);
    },
    [authContext, logMutation]
  );

  if (redirectToHomePage) {
    return <Redirect to={{ pathname: HOME_ROUTE }} />;
  }

  if (registerRedirect) {
    return <Redirect to={{ pathname: REGISTER_ROUTE }} />;
  }

  return (
    <LoginContainer>
      Login
      <Form form={form} onFinish={onFormSubmit}>
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'User name or email is required',
            },
          ]}
        >
          <CustomInput placeholder="User name or email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <CustomInput placeholder="Password" type="password" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>

            <Button type="link" onClick={() => setRegisterRedirect(true)}>
              Register
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
