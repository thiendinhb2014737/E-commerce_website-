import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {
  UserOutlined, AppstoreOutlined
} from '@ant-design/icons';
import HeaderComponents from '../../components/HeaderComponents/HeaderComponents';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
  ];


  const [keySelected, setKeySelected] = useState('')
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
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
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{
            width: '256px',
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: '1', padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage