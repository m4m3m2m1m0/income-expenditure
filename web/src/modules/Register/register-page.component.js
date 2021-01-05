import { Button, Input, Form, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import registerMutation from '../../shared/requests/user/registerMutation';
import { LOGIN_ROUTE } from '../../shared/const/routes.const';
import { Redirect } from 'react-router-dom';
import {
  openErrorNotification,
  openInfoNotification,
} from '../../shared/helpers/notifications.helper';

const RegisterContainer = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  justify-content: center;
  margin-bottom: 100px;
  padding: 50px;
`;

const CustomInput = styled(Input)`
  width: 300px;
`;

const Register = () => {
  const [form] = Form.useForm();
  const registerMut = useMutation(registerMutation);
  const [loginRedirect, setLoginRedirect] = useState(false);

  const onFormSubmit = useCallback(
    async (user) => {
      delete user.confirmPassword;

      try {
        await registerMut.mutateAsync(user);
        openInfoNotification('Your account has been created!');
      } catch ({ response }) {
        openErrorNotification(response.data.message);
      }
    },
    [registerMut]
  );

  const onPasswordChange = useCallback(async () => {
    try {
      const confirmPassword = form.getFieldInstance('confirmPassword').state
        .value;

      if (confirmPassword !== undefined) {
        await form.validateFields(['confirmPassword']);
      }
    } catch (e) {}
  }, [form]);

  if (loginRedirect) {
    return <Redirect to={{ pathname: LOGIN_ROUTE }} />;
  }

  return (
    <RegisterContainer>
      Register
      <Form form={form} onFinish={onFormSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Invalid email',
            },
            {
              required: true,
              message: 'Email is required',
            },
          ]}
        >
          <CustomInput placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <CustomInput placeholder="User name" />
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
          <CustomInput
            placeholder="Password"
            type="password"
            onChange={onPasswordChange}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Password does not match');
              },
            }),
          ]}
        >
          <CustomInput placeholder="Confirm password" type="password" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Register
            </Button>

            <Button type="link" onClick={() => setLoginRedirect(true)}>
              Login
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
