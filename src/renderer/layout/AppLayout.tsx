import { useContext, useState } from 'react';
import { Layout, Flex, Menu, MenuProps, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ApiContext } from '../providers/ApiProvider';

type MenuItem = Required<MenuProps>['items'][number];

function AppLayout({ children }: any) {
  const { logout } = useContext(ApiContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // get location to set default selected key
  const location = useLocation();
  const defaultSelectedKey = location.pathname.split('/')[1];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: 'reservations',
      label: 'Reservations',
      onClick: () => navigate('/reservations'),
    },
    { key: 'guests', label: 'Guests', onClick: () => navigate('/guests') },
    { key: 'rooms', label: 'Rooms', onClick: () => navigate('/rooms') },
    { key: 'staff', label: 'Staff', onClick: () => navigate('/staff') },
    {
      key: 'services',
      label: 'Services',
      onClick: () => navigate('/services'),
    },
    {
      key: 'reservation-service',
      label: 'Reservation Service',
      onClick: () => navigate('/reservation-service'),
    },
    {
      key: 'price-change-log',
      label: 'Price Change Log',
      onClick: () => navigate('/price-change-log'),
    },
    {
      key: 'payments',
      label: 'Payments',
      onClick: () => navigate('/payments'),
    },
    {
      key: 'available-rooms',
      label: 'Available Rooms',
      onClick: () => navigate('/available-rooms'),
    },
    {
      key: 'guest-reservations',
      label: 'Guest Reservations',
      onClick: () => navigate('/guest-reservations'),
    },
    {
      key: 'rooms-with-reservations',
      label: 'Rooms With Reservations',
      onClick: () => navigate('/rooms-with-reservations'),
    },
    {
      key: 'guests-with-reservations',
      label: 'Guests With Reservations',
      onClick: () => navigate('/guests-with-reservations'),
    },
    {
      key: 'current-guests',
      label: 'Current Guests',
      onClick: () => navigate('/current-guests'),
    },
    {
      key: 'walk-in-reservation',
      label: 'Walk-in Reservation',
      onClick: () => navigate('/walk-in-reservation'),
    },
    {
      key: 'services-revenue',
      label: 'Services Revenue',
      onClick: () => navigate('/services-revenue'),
    },
    {
      key: 'reservation-details',
      label: 'Reservation Details',
      onClick: () => navigate('/reservation-details'),
    },
    {
      key: 'logout',
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
          background: 'white',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Menu
          style={{
            left: 0,
            position: 'fixed',
          }}
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
            style={{
              color: '#001529',
              padding: 0,
              margin: 0,
              userSelect: 'none',
            }}
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
            defaultSelectedKeys={[defaultSelectedKey]}
            mode="inline"
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
