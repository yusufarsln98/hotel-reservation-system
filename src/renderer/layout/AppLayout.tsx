import { useContext, useState } from 'react';
import { Layout, Flex, Menu, MenuProps, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import { ApiContext } from '../providers/ApiProvider';

type MenuItem = Required<MenuProps>['items'][number];

function AppLayout({ children }: any) {
  const { logout } = useContext(ApiContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Reservations',
      onClick: () => navigate('/reservations'),
    },
    { key: '2', label: 'Guests', onClick: () => navigate('/guests') },
    { key: '3', label: 'Rooms', onClick: () => navigate('/rooms') },
    { key: '4', label: 'Staff', onClick: () => navigate('/staff') },
    { key: '5', label: 'Services', onClick: () => navigate('/services') },
    {
      key: '6',
      label: 'Reservation Service',
      onClick: () => navigate('/reservation-service'),
    },
    {
      key: '7',
      label: 'Price Change Log',
      onClick: () => navigate('/price-change-log'),
    },
    { key: '8', label: 'Payments', onClick: () => navigate('/payments') },
    { key: '9', label: 'Feedbacks', onClick: () => navigate('/feedbacks') },
    {
      key: '10',
      label: 'Maintenance Requests',
      onClick: () => navigate('/maintenance-requests'),
    },
    {
      key: '11',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Flex
      vertical
      align="center"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header
        style={{
          width: '100%',
          left: 0,
          top: 0,
          position: 'fixed',
          color: 'white',
        }}
      >
        <Menu
          style={{
            left: 0,
            position: 'fixed',
          }}
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: '1',
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              onClick: toggleCollapsed,
              style: { cursor: 'pointer' },
            },
          ]}
          selectable={false}
        />
        <Flex
          align="center"
          justify="center"
          gap={20}
          style={{ marginTop: 12 }}
        >
          <Typography.Title
            level={3}
            style={{ color: 'white', padding: 0, margin: 0 }}
          >
            Hotel Reservation System
          </Typography.Title>
        </Flex>
      </Header>
      <Layout.Content style={{ width: '100%', padding: '48px 24px' }}>
        <div
          style={{
            width: 256,
            top: 64,
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        >
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            style={{ height: '100%' }}
          />
        </div>
        <div
          style={{
            marginLeft: collapsed ? 80 : 256,
            padding: 24,
            transition: 'margin 0.2s',
            height: '100%',
          }}
        >
          <Outlet />
          {children}
        </div>
      </Layout.Content>
    </Flex>
  );
}

export default AppLayout;
