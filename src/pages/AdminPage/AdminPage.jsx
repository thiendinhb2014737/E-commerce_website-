import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {
  UserOutlined, AppstoreOutlined, HomeOutlined, BarChartOutlined, SkinOutlined, CalendarOutlined, MailOutlined
} from '@ant-design/icons';
import HeaderComponents from '../../components/HeaderComponents/HeaderComponents';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAmin';
import StatisticalAmin from '../../components/Statistical/StatisticalAmin';
import EventAdmin from '../../components/EventAdmin/EventAdmin';
import { useNavigate } from 'react-router-dom';
import ContactAdmin from '../../components/ContactAdmin/ContactAdmin';

const AdminPage = () => {
  const items = [
    getItem('Trang chủ', 'homePage', <HomeOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <SkinOutlined />),
    getItem('Đơn hàng', 'order', <AppstoreOutlined />),
    getItem('Sự kiện', 'event', <CalendarOutlined />),
    getItem('Liên hệ', 'contact', <MailOutlined />),
    getItem('Thống kê', 'statistical', <BarChartOutlined />),
  ];
  const navigate = useNavigate()

  const [keySelected, setKeySelected] = useState('')
  const renderPage = (key) => {
    switch (key) {
      case 'homePage':
        navigate(`/`)
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'order':
        return (
          <OrderAdmin />
        )
      case 'event':
        return (
          <EventAdmin />
        )
      case 'contact':
        return (
          <ContactAdmin />
        )
      case 'statistical':
        return (
          <StatisticalAmin />
        )


      default:
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
  //console.log('keySelected', keySelected)
  return (
    <>
      <HeaderComponents isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: '236px',
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
            paddingTop: '15px',

          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: '1', padding: '15px 0 15px 15px' }}>
          {renderPage(keySelected)}
        </div>

      </div>
    </>
  )
}

export default AdminPage