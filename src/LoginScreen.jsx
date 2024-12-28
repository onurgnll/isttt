import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Content } = Layout;

const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Burada normalde bir API çağrısı yapılır
    setTimeout(() => {
      setLoading(false);
      if (values.username === 'a' && values.password === 'a') {
        message.success('Giriş başarılı!');
        onLogin();
      } else {
        message.error('Kullanıcı adı veya şifre hatalı!');
      }
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 300, background: '#FFFFFF' }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', background: '#4096FF', borderColor: '#4096FF' }}>
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginScreen;

