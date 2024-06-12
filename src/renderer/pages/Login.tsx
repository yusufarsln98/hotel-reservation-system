import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, Input, Typography, message } from 'antd';
import { ApiContext } from '../providers/ApiProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuth } = useContext(ApiContext);

  // check if it is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await isAuth();
        navigate('/reservations');
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, [isAuth, navigate]);

  const onFinish = async (values: any) => {
    try {
      await login(values);
      navigate('/reservations');
    } catch (err: any) {
      console.error(err.response.data);
      message.error(
        `${err.response.data.code}, ${err.response.data.sqlMessage}`,
      );
    }
  };

  return (
    <Flex vertical align="center" gap={20}>
      <Typography.Title level={2}>Hotel Reservation System</Typography.Title>
      <Typography.Title level={3}>Login</Typography.Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo);
        }}
        layout="vertical"
      >
        <Form.Item
          label="User"
          name="user"
          rules={[{ required: true, message: 'Please input your user!' }]}
        >
          <Input placeholder="User" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
